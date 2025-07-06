import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';
import { sendEmail } from '../services/emailService.js';

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  // Save contact message to database
  const contactMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone,
      subject,
      message,
      isRead: false
    }
  });
  
  // Send notification email to admin
  try {
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission - Elevat Rehabilitation Center</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Message</h3>
          <p>${message}</p>
        </div>
        
        <p>Please respond to this inquiry as soon as possible.</p>
        
        <p>Best regards,<br>
        Elevat Rehabilitation Center System</p>
      </div>
    `;
    
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      html: adminEmailContent
    });
    
    // Send auto-reply to user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank You for Contacting Elevat Rehabilitation Center</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Your Message Summary</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>Our team typically responds within 24-48 hours during business days.</p>
        
        <p>If you have an urgent matter, please call us at +254 704 376 452.</p>
        
        <p>Best regards,<br>
        Elevat Rehabilitation Center</p>
      </div>
    `;
    
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting Elevat Rehabilitation Center',
      html: userEmailContent
    });
  } catch (error) {
    console.error('Error sending contact form emails:', error);
  }
  
  res.status(201).json({
    status: 'success',
    message: 'Your message has been sent successfully. We will get back to you soon.',
    contactMessage: {
      id: contactMessage.id,
      name: contactMessage.name,
      email: contactMessage.email,
      subject: contactMessage.subject,
      createdAt: contactMessage.createdAt
    }
  });
});

/**
 * @desc    Get all contact messages for admin
 * @route   GET /api/contact/admin
 * @access  Private/Admin
 */
export const getAllContactMessages = asyncHandler(async (req, res) => {
  const { isRead } = req.query;
  
  const messages = await prisma.contactMessage.findMany({
    where: {
      ...(isRead !== undefined && { isRead: isRead === 'true' })
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  res.json(messages);
});

/**
 * @desc    Mark contact message as read
 * @route   PATCH /api/contact/:id/read
 * @access  Private/Admin
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const message = await prisma.contactMessage.findUnique({
    where: { id }
  });
  
  if (!message) {
    throw ApiError.notFound('Contact message not found');
  }
  
  const updatedMessage = await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true }
  });
  
  res.json({
    status: 'success',
    message: 'Message marked as read',
    contactMessage: updatedMessage
  });
});

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
export const deleteContactMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const message = await prisma.contactMessage.findUnique({
    where: { id }
  });
  
  if (!message) {
    throw ApiError.notFound('Contact message not found');
  }
  
  await prisma.contactMessage.delete({
    where: { id }
  });
  
  res.json({
    status: 'success',
    message: 'Contact message deleted successfully'
  });
});