import prisma from '../prisma/client.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * @desc    Get all published blogs
 * @route   GET /api/blogs
 * @access  Public
 */
export const getBlogs = asyncHandler(async (req, res) => {
  const { category, search, limit = 10, page = 1 } = req.query;
  
  const where = {
    isPublished: true,
    ...(category && { category }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { snippet: { contains: search, mode: 'insensitive' } }
      ]
    })
  };
  
  const blogs = await prisma.blog.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    },
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit)
  });
  
  res.json(blogs);
});

/**
 * @desc    Get single blog by ID
 * @route   GET /api/blogs/:id
 * @access  Public
 */
export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const blog = await prisma.blog.findUnique({
    where: { 
      id,
      isPublished: true 
    }
  });
  
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }
  
  res.json(blog);
});

/**
 * @desc    Get related blogs by category
 * @route   GET /api/blogs/related/:id
 * @access  Public
 */
export const getRelatedBlogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category, limit = 3 } = req.query;
  
  const relatedBlogs = await prisma.blog.findMany({
    where: {
      id: { not: id },
      isPublished: true,
      ...(category && { category })
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: parseInt(limit)
  });
  
  res.json(relatedBlogs);
});

/**
 * @desc    Create a new blog post
 * @route   POST /api/blogs
 * @access  Private/Admin
 */
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, snippet, author, category, imageUrl, readTime } = req.body;
  
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      snippet,
      author,
      category,
      imageUrl,
      readTime,
      isPublished: false
    }
  });
  
  res.status(201).json({
    status: 'success',
    message: 'Blog post created successfully',
    blog
  });
});

/**
 * @desc    Update a blog post
 * @route   PUT /api/blogs/:id
 * @access  Private/Admin
 */
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, snippet, author, category, imageUrl, readTime, isPublished } = req.body;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });
  
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }
  
  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      content,
      snippet,
      author,
      category,
      imageUrl,
      readTime,
      isPublished
    }
  });
  
  res.json({
    status: 'success',
    message: 'Blog post updated successfully',
    blog: updatedBlog
  });
});

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blogs/:id
 * @access  Private/Admin
 */
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });
  
  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }
  
  await prisma.blog.delete({
    where: { id }
  });
  
  res.json({
    status: 'success',
    message: 'Blog post deleted successfully'
  });
});

/**
 * @desc    Get blog categories
 * @route   GET /api/blogs/categories
 * @access  Public
 */
export const getBlogCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.blog.groupBy({
    by: ['category'],
    where: {
      isPublished: true
    },
    _count: {
      category: true
    }
  });
  
  res.json(categories);
});