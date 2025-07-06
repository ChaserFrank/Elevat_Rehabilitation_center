import express from 'express';
import { 
  getSessions, 
  getSessionById, 
  createSession, 
  updateSession, 
  deleteSession 
} from '../controllers/sessionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSessions);
router.get('/:id', getSessionById);

// Protected admin routes
router.use(protect);
router.use(admin);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;