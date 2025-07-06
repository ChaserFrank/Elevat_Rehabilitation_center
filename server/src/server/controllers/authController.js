import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { sendEmail } from '../services/emailService.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email }
  });
  
  if (userExists) {
    throw ApiError.badRequest('User already exists');
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
  
  if (user) {
    // Generate token
    const token = generateToken(user.id);
    
    // Send welcome email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to Elevat Rehabilitation Center',
        text: `Hello ${user.name}, thank you for registering with Elevat Rehabilitation Center.`,
        html: `<p>Hello ${user.name},</p><p>Thank you for registering with Elevat Rehabilitation Center.</p>`
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
    
    res.status(201).json({
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } else {
    throw ApiError.internal('Failed to create user');
  }
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  // Check if user exists and password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate token
    const token = generateToken(user.id);
    
    res.json({
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } else {
    throw ApiError.unauthorized('Invalid email or password');
  }
});

/**
 * @desc    Forgot password - send reset token
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (!user) {
    throw ApiError.notFound('No user found with that email');
  }
  
  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token and set to passwordResetToken field
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set token expiration (10 minutes)
  const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  
  // Update user with reset token and expiration
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken,
      passwordResetExpires
    }
  });
  
  // Create reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const message = `
    You are receiving this email because you (or someone else) has requested to reset your password.
    Please click on the following link to reset your password:
    
    ${resetUrl}
    
    If you didn't request this, please ignore this email and your password will remain unchanged.
  `;
  
  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    });
    
    res.json({
      status: 'success',
      message: 'Password reset email sent'
    });
  } catch (error) {
    // If error sending email, remove reset token and expiration
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null
      }
    });
    
    throw ApiError.internal('Error sending password reset email');
  }
});

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  
  // Hash token from params
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
  // Find user by reset token and check if token is still valid
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        gt: new Date()
      }
    }
  });
  
  if (!user) {
    throw ApiError.badRequest('Invalid or expired reset token');
  }
  
  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Update user with new password and remove reset token fields
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null
    }
  });
  
  // Generate new token
  const newToken = generateToken(user.id);
  
  res.json({
    status: 'success',
    message: 'Password reset successful',
    token: newToken
  });
});

/**
 * @desc    Verify user token and return user data
 * @route   GET /api/auth/verify
 * @access  Private
 */
export const verify = asyncHandler(async (req, res) => {
  res.json({
    status: 'success',
    user: req.user
  });
});