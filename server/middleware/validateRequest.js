import { ApiError } from './errorHandler.js';

/**
 * Validate request using Joi schema
 * @param {Object} schema - Joi validation schema
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(ApiError.badRequest(errorMessage, error.details));
    }
    
    next();
  };
};