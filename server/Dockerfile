# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

COPY prisma ./prisma 

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the React frontend
RUN npm run build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S elevatrehabilitationcenter -u 1001

# Change ownership of the app directory
RUN chown -R elevatrehabilitationcenter:nodejs /app
USER elevatrehabilitationcenter

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
