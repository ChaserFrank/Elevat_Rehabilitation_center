import express from 'express';
import { 
  submitContactForm,
  getAllContactMessages,
  markAsRead,
  deleteContactMessage
} from '../controllers/contactController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', submitContactForm);

// Protected admin routes
//router.use(protect);
// router.use(admin);
router.get('/admin', authenticateToken, requireAdmin, getAllContactMessages);
router.patch('/:id/read', authenticateToken, requireAdmin, markAsRead);
router.delete('/:id', authenticateToken, requireAdmin, deleteContactMessage);

export default router;