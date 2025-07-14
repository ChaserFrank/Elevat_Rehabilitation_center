import express from 'express';
import { 
  getDashboardStats, 
  getAllAppointments, 
  updateAppointmentStatus, 
  getAppointmentById 
} from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
//router.use(protect);
router.use(admin);

router.get('/dashboard', authenticateToken, requireAdmin, getDashboardStats);
router.get('/appointments', authenticateToken, requireAdmin, getAllAppointments);
router.get('/appointments/:id', authenticateToken, requireAdmin, getAppointmentById);
router.patch('/appointments/:id', authenticateToken, requireAdmin, updateAppointmentStatus);

export default router;