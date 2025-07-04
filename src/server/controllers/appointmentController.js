import crypto from 'crypto';
import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';
import { sendEmail } from '../services/emailService.js';

/**
 * @desc    Create a new appointment
 * @route   POST /api/appointments
 * @access  Private
 */
export const createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, date, time, notes, serviceTitle } = req.body;
  const userId = req.user.id;
  
  // Generate unique ticket number
  const ticketNumber = `ELEVAT-REHAB-${new Date(date).toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
  
  // Combine date and time
  const scheduledFor = new Date(`${date}T${convertTo24Hour(time)}`);
  
  // Check if slot is already booked
  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      scheduledFor,
      status: {
        not: 'cancelled'
      }
    }
  });
  
  if (existingAppointment) {
    throw ApiError.badRequest('This time slot is already booked');
  }
  
  // Create appointment
  const appointment = await prisma.appointment.create({
    data: {
      ticketNumber,
      userId,
      serviceId: parseInt(serviceId),
      service: serviceTitle,
      scheduledFor,
      notes,
      status: 'confirmed'
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  
  // Send confirmation email
  try {
    await sendAppointmentConfirmationEmail(appointment);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
  
  res.status(201).json({
    status: 'success',
    appointment,
    ticket: {
      ticketNumber: appointment.ticketNumber,
      service: appointment.service,
      date: date,
      time: time,
      location: '2344, Kiambu',
      psychologist: 'Psychologist Joan'
    }
  });
});

/**
 * @desc    Get available time slots for a date
 * @route   GET /api/appointments/available-times
 * @access  Public
 */
export const getAvailableTimes = asyncHandler(async (req, res) => {
  const { date, serviceId } = req.query;
  
  // Get all booked appointments for the date
  const bookedAppointments = await prisma.appointment.findMany({
    where: {
      scheduledFor: {
        gte: new Date(`${date}T00:00:00`),
        lt: new Date(`${date}T23:59:59`)
      },
      status: {
        not: 'cancelled'
      }
    },
    select: {
      scheduledFor: true
    }
  });
  
  // Define all possible time slots
  const allTimeSlots = [
    '9:00 AM', '10:30 AM', '12:00 PM', 
    '1:30 PM', '3:00 PM', '4:30 PM'
  ];
  
  // Filter out booked slots
  const bookedTimes = bookedAppointments.map(apt => 
    formatTimeFromDate(apt.scheduledFor)
  );
  
  const availableTimes = allTimeSlots.filter(time => 
    !bookedTimes.includes(time)
  );
  
  res.json(availableTimes);
});

/**
 * @desc    Get user's appointments
 * @route   GET /api/appointments/my-appointments
 * @access  Private
 */
export const getUserAppointments = asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: {
      userId: req.user.id
    },
    orderBy: {
      scheduledFor: 'desc'
    }
  });
  
  res.json({
    status: 'success',
    appointments
  });
});

/**
 * @desc    Cancel an appointment
 * @route   PATCH /api/appointments/:id/cancel
 * @access  Private
 */
export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  
  if (!appointment) {
    throw ApiError.notFound('Appointment not found');
  }
  
  // Check if user owns the appointment or is admin
  if (appointment.userId !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to cancel this appointment');
  }
  
  // Update appointment status
  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: { status: 'cancelled' }
  });
  
  // Send cancellation email
  try {
    await sendAppointmentCancellationEmail(appointment);
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }
  
  res.json({
    status: 'success',
    message: 'Appointment cancelled successfully',
    appointment: updatedAppointment
  });
});

// Helper functions
function convertTo24Hour(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
}

function formatTimeFromDate(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

async function sendAppointmentConfirmationEmail(appointment) {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Appointment Confirmation - Elevat Rehabilitation Center</h2>
      
      <p>Dear ${appointment.user.name},</p>
      
      <p>Your appointment has been successfully scheduled. Here are the details:</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1f2937;">Appointment Details</h3>
        <p><strong>Ticket Number:</strong> ${appointment.ticketNumber}</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Date & Time:</strong> ${new Date(appointment.scheduledFor).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} at ${formatTimeFromDate(appointment.scheduledFor)}</p>
        <p><strong>Psychologist:</strong> Joan</p>
        <p><strong>Location:</strong> Elevat Rehabilitation Center<br>
        2344<br>
        Kiambu</p>
      </div>
      
      <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #92400e;"><strong>Important:</strong> Please bring this ticket number to your appointment: <strong>${appointment.ticketNumber}</strong></p>
      </div>
      
      <p>Please arrive 10 minutes early for check-in. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
      
      <p>We look forward to seeing you!</p>
      
      <p>Best regards,<br>
      Psychologist Joan</p>
    </div>
  `;
  
  await sendEmail({
    to: appointment.user.email,
    subject: `Appointment Confirmation`,
    html: emailContent
  });
}

async function sendAppointmentCancellationEmail(appointment) {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Appointment Cancelled - RehabCare</h2>
      
      <p>Dear ${appointment.user.name},</p>
      
      <p>Your appointment has been cancelled. Here were the details:</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Ticket Number:</strong> ${appointment.ticketNumber}</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Date & Time:</strong> ${new Date(appointment.scheduledFor).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} at ${formatTimeFromDate(appointment.scheduledFor)}</p>
      </div>
      
      <p>If you would like to schedule a new appointment, please visit our website or contact us directly.</p>
      
      <p>Best regards,<br>
      Psychologist Joan</p>
    </div>
  `;
  
  await sendEmail({
    to: appointment.user.email,
    subject: `Appointment Cancellation`,
    html: emailContent
  });
}