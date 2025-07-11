import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all active services
export const getAllServices = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let whereClause = {
      isActive: true
    };

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } }
      ];
    }

    const services = await prisma.session.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
};

// Get single service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.session.findUnique({
      where: { id }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    if (!service.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Service is not available'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service'
    });
  }
};

// Get service categories
export const getServiceCategories = async (req, res) => {
  try {
    const categories = await prisma.session.findMany({
      where: { 
        isActive: true,
        category: { not: null }
      },
      select: { category: true },
      distinct: ['category']
    });

    const categoryList = categories
      .map(item => item.category)
      .filter(Boolean)
      .sort();

    res.json({
      success: true,
      data: categoryList
    });
  } catch (error) {
    console.error('Error fetching service categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service categories'
    });
  }
};

// Admin: Create new service
export const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      duration,
      image,
      benefits,
      category,
      availability
    } = req.body;

    const service = await prisma.session.create({
      data: {
        title,
        description,
        shortDescription,
        duration: parseInt(duration) || 60,
        image,
        benefits: benefits || [],
        category,
        availability: availability || null,
        isActive: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service'
    });
  }
};

// Admin: Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert duration to integer if provided
    if (updateData.duration) {
      updateData.duration = parseInt(updateData.duration);
    }

    const service = await prisma.session.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Error updating service:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update service'
    });
  }
};

// Admin: Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.session.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete service'
    });
  }
};

// Admin: Toggle service status
export const toggleServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.session.findUnique({
      where: { id }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const updatedService = await prisma.session.update({
      where: { id },
      data: { isActive: !service.isActive }
    });

    res.json({
      success: true,
      message: `Service ${updatedService.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedService
    });
  } catch (error) {
    console.error('Error toggling service status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle service status'
    });
  }
};

// Admin: Get all services (including inactive)
export const getAllServicesAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (status !== undefined) {
      whereClause.isActive = status === 'active';
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [services, total] = await Promise.all([
      prisma.session.findMany({
        where: whereClause,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.session.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: services,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching services for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
};