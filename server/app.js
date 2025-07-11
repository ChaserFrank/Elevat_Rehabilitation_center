import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Route imports
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware
import { errorHandler } from './middleware/errorHandler.js';

// Init env
dotenv.config();

// Init app
const app = express();

// Middleware
app.use(cors({
  origin: ['https://elevatrehabilitationcenter.org'], // domain
  credentials: true
}));

app.use(helmet({
  contentSecurityPolicy: false, // Optional: Disable if causing CORS issues
}));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Elevat Rehabilitation Center API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Optional: Friendly root message
app.get('/', (req, res) => {
  res.send('Elevat Rehabilitation Center API is live!');
});

// Error handler
app.use(errorHandler);

export default app;
