#!/bin/bash

# Elevat Rehabilitation Center Deployment Script
echo " Starting Elevat Rehabilitation Center deployment..."

# Build the frontend
echo " Building frontend..."
npm run build

# Run database migrations
echo " Running database migrations..."
npx prisma migrate deploy
npx prisma generate

# Start the application
echo " Starting application..."
npm start