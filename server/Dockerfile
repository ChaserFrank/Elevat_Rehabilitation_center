# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Add OpenSSL if needed
# RUN apk add --no-cache openssl1.1-compat


# Copy package files
COPY package*.json ./
RUN npm install

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate --schema=prisma/schema.prisma

# Copy source code
COPY . .

# Install dependencies
RUN npm ci --only=production

# Build the React frontend
RUN npm run build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S elevatrehabilitationcenter -u 1001

# Change ownership of the app directory
RUN chown -R elevatrehabilitationcenter:nodejs /app
# Add this before USER elevatuser
RUN adduser -D elevatuser

USER elevatuser
USER elevatrehabilitationcenter

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
