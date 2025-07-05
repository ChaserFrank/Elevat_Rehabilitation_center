# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React frontend
RUN mkdir -p src/server/public && npm run build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S admin -u 1001

# Change ownership of the app directory
RUN chown -R admin:nodejs /app
USER elevatuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
