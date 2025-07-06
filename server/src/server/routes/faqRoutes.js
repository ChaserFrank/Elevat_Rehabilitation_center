import express from 'express';
import { 
  getFAQs, 
  submitFAQ,
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} from '../controllers/faqController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getFAQs);
router.post('/submit', submitFAQ);

// Protected admin routes
router.use(protect);
router.use(admin);
router.post('/', createFAQ);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

export default router;