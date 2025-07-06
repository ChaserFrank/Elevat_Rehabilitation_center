import express from 'express';
import { 
  getDashboardStats, 
  getAllAppointments, 
  updateAppointmentStatus, 
  getAppointmentById 
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/appointments', getAllAppointments);
router.get('/appointments/:id', getAppointmentById);
router.patch('/appointments/:id', updateAppointmentStatus);

export default router;