import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import { ApiError } from './errorHandler.js';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return next(ApiError.unauthorized('Not authorized, no token provided'));
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });
      
      if (!user) {
        return next(ApiError.unauthorized('User not found'));
      }
      
      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      return next(ApiError.unauthorized('Not authorized, token verification failed'));
    }
  } catch (error) {
    next(error);
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(ApiError.forbidden('Not authorized as admin'));
  }
};