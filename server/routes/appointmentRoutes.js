import express from 'express';
import { 
  createAppointment, 
  getAvailableTimes, 
  getUserAppointments, 
  cancelAppointment 
} from '../controllers/appointmentController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
//import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/available-times', requireUser, getAvailableTimes);

// Protected routes
router.use(protect);
router.post('/', authenticateToken, requireAdmin, createAppointment);
router.get('/my-appointments', authenticateToken, requireAdmin, getUserAppointments);
router.patch('/:id/cancel', authenticateToken, requireAdmin, cancelAppointment);

export default router;