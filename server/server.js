import app from './app.js';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`API URL: http://elevatrehabilitationcenter.org:${PORT}/api`);
});