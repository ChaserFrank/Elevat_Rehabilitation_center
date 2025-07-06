import express from 'express';
import { 
  createAppointment, 
  getAvailableTimes, 
  getUserAppointments, 
  cancelAppointment 
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/available-times', getAvailableTimes);

// Protected routes
router.use(protect);
router.post('/', createAppointment);
router.get('/my-appointments', getUserAppointments);
router.patch('/:id/cancel', cancelAppointment);

export default router;