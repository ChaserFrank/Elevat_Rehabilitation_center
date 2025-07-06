import express from 'express';
import { 
  submitContactForm,
  getAllContactMessages,
  markAsRead,
  deleteContactMessage
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', submitContactForm);

// Protected admin routes
router.use(protect);
router.use(admin);
router.get('/admin', getAllContactMessages);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteContactMessage);

export default router;