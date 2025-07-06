import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * @desc    Get all published FAQs
 * @route   GET /api/faqs
 * @access  Public
 */
export const getFAQs = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  const faqs = await prisma.fAQ.findMany({
    where: {
      isPublished: true,
      ...(category && { category })
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  res.json(faqs);
});

/**
 * @desc    Submit a new FAQ question
 * @route   POST /api/faqs/submit
 * @access  Public
 */
export const submitFAQ = asyncHandler(async (req, res) => {
  const { question, category = 'General' } = req.body;
  
  const faq = await prisma.fAQ.create({
    data: {
      question,
      answer: 'Thank you for your question. Our team will review it and provide an answer soon.',
      category,
      userSubmitted: true,
      isPublished: false
    }
  });
  
  res.status(201).json({
    status: 'success',
    message: 'Question submitted successfully',
    faq
  });
});

/**
 * @desc    Create a new FAQ
 * @route   POST /api/faqs
 * @access  Private/Admin
 */
export const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, category } = req.body;
  
  const faq = await prisma.fAQ.create({
    data: {
      question,
      answer,
      category,
      userSubmitted: false,
      isPublished: true
    }
  });
  
  res.status(201).json({
    status: 'success',
    message: 'FAQ created successfully',
    faq
  });
});

/**
 * @desc    Update an FAQ
 * @route   PUT /api/faqs/:id
 * @access  Private/Admin
 */
export const updateFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, answer, category, isPublished } = req.body;
  
  const faq = await prisma.fAQ.findUnique({
    where: { id }
  });
  
  if (!faq) {
    throw ApiError.notFound('FAQ not found');
  }
  
  const updatedFAQ = await prisma.fAQ.update({
    where: { id },
    data: {
      question,
      answer,
      category,
      isPublished
    }
  });
  
  res.json({
    status: 'success',
    message: 'FAQ updated successfully',
    faq: updatedFAQ
  });
});

/**
 * @desc    Delete an FAQ
 * @route   DELETE /api/faqs/:id
 * @access  Private/Admin
 */
export const deleteFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const faq = await prisma.fAQ.findUnique({
    where: { id }
  });
  
  if (!faq) {
    throw ApiError.notFound('FAQ not found');
  }
  
  await prisma.fAQ.delete({
    where: { id }
  });
  
  res.json({
    status: 'success',
    message: 'FAQ deleted successfully'
  });
});