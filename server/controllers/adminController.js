import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Get total counts
  const [totalUsers, totalAppointments, totalBlogs] = await Promise.all([
    prisma.user.count(),
    prisma.appointment.count(),
    prisma.blog.count()
  ]);
  
  // Get recent appointments
  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
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
  
  // Get recent users
  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
  
  res.json({
    status: 'success',
    totalUsers,
    totalAppointments,
    //totalRevenue: totalAppointments * 150, // Estimated revenue
    totalBlogs,
    recentAppointments,
    recentUsers
  });
});

/**
 * @desc    Get all appointments for admin
 * @route   GET /api/admin/appointments
 * @access  Private/Admin
 */
export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      scheduledFor: 'desc'
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
  
  res.json(appointments);
});

/**
 * @desc    Update appointment status
 * @route   PATCH /api/admin/appointments/:id
 * @access  Private/Admin
 */
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['confirmed', 'attended', 'missed', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    throw ApiError.badRequest('Invalid status');
  }
  
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  
  res.json({
    status: 'success',
    message: 'Appointment status updated successfully',
    appointment
  });
});

/**
 * @desc    Get appointment by ID
 * @route   GET /api/admin/appointments/:id
 * @access  Private/Admin
 */
export const getAppointmentById = asyncHandler(async (req, res) => {
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
  
  res.json({
    status: 'success',
    appointment
  });
});