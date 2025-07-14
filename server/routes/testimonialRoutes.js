import express from 'express';
import { 
  getTestimonials, 
  createTestimonial,
  getAllTestimonials,
  approveTestimonial,
  getTestimonialById,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { authenticateToken, requireAdmin, requireUser } from '../middleware/authMiddleware.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);

// Protected routes
//router.use(protect);
router.post('/', authenticateToken, createTestimonial);

// Admin routes
router.use(admin);
router.get('/admin', authenticateToken, requireAdmin, getAllTestimonials);
router.put('/:id', authenticateToken, requireAdmin, createTestimonial);
router.patch('/:id/approve', authenticateToken, requireAdmin, approveTestimonial);
router.delete('/:id', authenticateToken, requireAdmin, deleteTestimonial);

export default router;