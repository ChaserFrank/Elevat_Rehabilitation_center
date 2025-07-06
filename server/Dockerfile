# Use Debian-based Node.js for full compatibility
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Copy prisma schema early so it's available for prisma generate
COPY prisma ./prisma


# Install OpenSSL required for Prisma (especially for Linux/debian)
RUN apt-get update -y && apt-get install -y openssl

# Install production dependencies only
RUN npm ci --only=production

# Copy source code (including prisma schema and rest of the app)
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Optional: build frontend if this is a full-stack app
# If this backend-only, remove the next line
# RUN npm run build

# Create non-root user for security
RUN addgroup --gid 1001 nodejs && \
    adduser --uid 1001 --ingroup nodejs --disabled-password --gecos "" elevatrehabilitationcenter


# Change ownership
RUN chown -R elevatrehabilitationcenter:nodejs /app

# Use non-root user
USER elevatrehabilitationcenter

# Expose backend port
EXPOSE 5000

# Health check (adjust path if needed)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Start backend service
CMD ["npm", "start"]
