import express from 'express';
import { 
  getSessions, 
  getSessionById, 
  createSession, 
  updateSession, 
  deleteSession 
} from '../controllers/sessionController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSessions);
router.get('/:id', getSessionById);

// Protected admin routes
//router.use(protect);
// router.use(admin);
router.post('/', authenticateToken, requireAdmin, createSession);
router.put('/:id', authenticateToken, requireAdmin, updateSession);
router.delete('/:id', authenticateToken, requireAdmin, deleteSession);

export default router;