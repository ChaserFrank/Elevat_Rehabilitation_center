import express from 'express';
import { 
  getBlogs, 
  getBlogById, 
  getRelatedBlogs,
  createBlog, 
  updateBlog, 
  deleteBlog,
  getBlogCategories
} from '../controllers/blogController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/categories', getBlogCategories);
router.get('/related/:id', getRelatedBlogs);
router.get('/:id', getBlogById);

// Protected admin routes
//router.use(protect);
// router.use(admin);
router.post('/', authenticateToken, requireAdmin, createBlog);
router.put('/:id', authenticateToken, requireAdmin, updateBlog);
router.delete('/:id', authenticateToken, requireAdmin, deleteBlog);

export default router;