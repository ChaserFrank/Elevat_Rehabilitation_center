import express from 'express';
import {
  getAllServices,
  getServiceById,
  getServiceCategories,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
  getAllServicesAdmin
} from '../controllers/serviceController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/categories', getServiceCategories);
router.get('/:id', getServiceById);

// Admin routes
router.get('/admin/all', authenticateToken, requireAdmin, getAllServicesAdmin);
router.post('/', authenticateToken, requireAdmin, createService);
router.put('/:id', authenticateToken, requireAdmin, updateService);
router.patch('/:id/toggle', authenticateToken, requireAdmin, toggleServiceStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteService);

export default router;