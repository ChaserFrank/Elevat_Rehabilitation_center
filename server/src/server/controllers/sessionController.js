import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * @desc    Get all active sessions/services
 * @route   GET /api/sessions
 * @access  Public
 */
export const getSessions = asyncHandler(async (req, res) => {
  const { category, isActive = true } = req.query;
  
  const sessions = await prisma.session.findMany({
    where: {
      isActive: isActive === 'true',
      ...(category && { category })
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  res.json(sessions);
});

/**
 * @desc    Get single session by ID
 * @route   GET /api/sessions/:id
 * @access  Public
 */
export const getSessionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const session = await prisma.session.findUnique({
    where: { id }
  });
  
  if (!session) {
    throw ApiError.notFound('Session not found');
  }
  
  res.json(session);
});

/**
 * @desc    Create a new session
 * @route   POST /api/sessions
 * @access  Private/Admin
 */
export const createSession = asyncHandler(async (req, res) => {
  const { 
    title, 
    description, 
    shortDescription, 
    duration, 
    image, 
    benefits, 
    category,
    availability 
  } = req.body;
  
  const session = await prisma.session.create({
    data: {
      title,
      description,
      shortDescription,
      duration: parseInt(duration) || 60,
      image,
      benefits: benefits || [],
      category,
      availability,
      isActive: true
    }
  });
  
  res.status(201).json({
    status: 'success',
    message: 'Session created successfully',
    session
  });
});

/**
 * @desc    Update a session
 * @route   PUT /api/sessions/:id
 * @access  Private/Admin
 */
export const updateSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { 
    title, 
    description, 
    shortDescription, 
    duration, 
    image, 
    benefits, 
    category,
    availability,
    isActive 
  } = req.body;
  
  const session = await prisma.session.findUnique({
    where: { id }
  });
  
  if (!session) {
    throw ApiError.notFound('Session not found');
  }
  
  const updatedSession = await prisma.session.update({
    where: { id },
    data: {
      title,
      description,
      shortDescription,
      duration: duration ? parseInt(duration) : session.duration,
      image,
      benefits,
      category,
      availability,
      isActive
    }
  });
  
  res.json({
    status: 'success',
    message: 'Session updated successfully',
    session: updatedSession
  });
});

/**
 * @desc    Delete a session
 * @route   DELETE /api/sessions/:id
 * @access  Private/Admin
 */
export const deleteSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const session = await prisma.session.findUnique({
    where: { id }
  });
  
  if (!session) {
    throw ApiError.notFound('Session not found');
  }
  
  await prisma.session.delete({
    where: { id }
  });
  
  res.json({
    status: 'success',
    message: 'Session deleted successfully'
  });
});