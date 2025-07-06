import express from 'express';
import { 
  getTestimonials, 
  createTestimonial,
  getAllTestimonials,
  approveTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getTestimonials);

// Protected routes
router.use(protect);
router.post('/', createTestimonial);

// Admin routes
router.use(admin);
router.get('/admin', getAllTestimonials);
router.patch('/:id/approve', approveTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;