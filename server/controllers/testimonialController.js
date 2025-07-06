import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * @desc    Get all approved testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
export const getTestimonials = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;
  
  const testimonials = await prisma.testimonial.findMany({
    where: {
      isApproved: true
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: parseInt(limit)
  });
  
  // Transform the response to include user name directly
  const formattedTestimonials = testimonials.map(testimonial => ({
    id: testimonial.id,
    message: testimonial.message,
    rating: testimonial.rating,
    name: testimonial.user.name,
    date: testimonial.createdAt,
    createdAt: testimonial.createdAt
  }));
  
  res.json(formattedTestimonials);
});

/**
 * @desc    Create a new testimonial
 * @route   POST /api/testimonials
 * @access  Private
 */
export const createTestimonial = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  const userId = req.user.id;
  
  const testimonial = await prisma.testimonial.create({
    data: {
      userId,
      message,
      rating: parseInt(rating),
      isApproved: false
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  });
  
  res.status(201).json({
    status: 'success',
    message: 'Testimonial submitted successfully and is pending approval',
    testimonial
  });
});

/**
 * @desc    Get all testimonials for admin
 * @route   GET /api/testimonials/admin
 * @access  Private/Admin
 */
export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  res.json(testimonials);
});

/**
 * @desc    Approve/reject testimonial
 * @route   PATCH /api/testimonials/:id/approve
 * @access  Private/Admin
 */
export const approveTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;
  
  const testimonial = await prisma.testimonial.findUnique({
    where: { id }
  });
  
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found');
  }
  
  const updatedTestimonial = await prisma.testimonial.update({
    where: { id },
    data: { isApproved },
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
    message: `Testimonial ${isApproved ? 'approved' : 'rejected'} successfully`,
    testimonial: updatedTestimonial
  });
});

/**
 * @desc    Delete testimonial
 * @route   DELETE /api/testimonials/:id
 * @access  Private/Admin
 */
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const testimonial = await prisma.testimonial.findUnique({
    where: { id }
  });
  
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found');
  }
  
  await prisma.testimonial.delete({
    where: { id }
  });
  
  res.json({
    status: 'success',
    message: 'Testimonial deleted successfully'
  });
});