import express from 'express';
import { 
  getFAQs, 
  submitFAQ,
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} from '../controllers/faqController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getFAQs);
router.post('/submit', submitFAQ);

// Protected admin routes
//router.use(protect);
router.use(admin);
router.post('/', authenticateToken, requireAdmin, createFAQ);
router.put('/:id', authenticateToken, requireAdmin, updateFAQ);
router.delete('/:id', authenticateToken, requireAdmin, deleteFAQ);

export default router;