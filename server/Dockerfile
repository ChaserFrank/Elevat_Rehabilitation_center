# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Copy the prisma schema into the right path
COPY server/prisma ./server/prisma

# Copy the full server code (after schema is in place)
COPY server ./server

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
# Add this before USER elevatuser
RUN adduser -D elevatrehabilitationcenter
USER elevatrehabilitationcenter

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Start the application
CMD ["npm", "start"]
