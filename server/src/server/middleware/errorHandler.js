/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Default error values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Customized error response based on environment
  const response = {
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'production' && { 
      stack: err.stack,
      details: err.details || null 
    })
  };
  
  res.status(statusCode).json(response);
};

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  
  static badRequest(message, details) {
    return new ApiError(message, 400, details);
  }
  
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(message, 401);
  }
  
  static forbidden(message = 'Forbidden') {
    return new ApiError(message, 403);
  }
  
  static notFound(message = 'Resource not found') {
    return new ApiError(message, 404);
  }
  
  static internal(message = 'Internal server error') {
    return new ApiError(message, 500);
  }
}

/**
 * Async route handler wrapper to catch errors
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};