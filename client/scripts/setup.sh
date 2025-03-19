#!/bin/bash

# Frontend Setup Script
echo "Starting frontend setup..."

# Install dependencies
npm ci

# Create production .env file
cat > .env.production << EOL
JWT_SECRET="${JWT_SECRET}"
NEXT_PUBLIC_API_BASE_URL="https://api.seiinstitute.com/api/v1"
NEXT_PUBLIC_IMAGE_BASE_URL="https://api.seiinstitute.com"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="${CLOUDINARY_CLOUD_NAME}"
NEXT_PUBLIC_CLOUDINARY_API_KEY="${CLOUDINARY_API_KEY}"
NEXT_PUBLIC_CLOUDINARY_API_SECRET="${CLOUDINARY_API_SECRET}"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="sei_institute"
EOL

# Copy production env
cp .env.production .env.local

# Build the application
npm run build

# Setup PM2
npm install pm2 -g
pm2 restart frontend || pm2 start npm --name "frontend" -- start
pm2 save

# Verify environment variables
echo "Verifying environment variables..."
if [ -f ".env.local" ]; then
  echo "Environment file exists"
  # Check critical variables
  if grep -q "NEXT_PUBLIC_API_BASE_URL" .env.local && grep -q "NEXT_PUBLIC_IMAGE_BASE_URL" .env.local; then
    echo "Critical environment variables are set"
  else
    echo "Error: Missing critical environment variables"
    exit 1
  fi
else
  echo "Error: Environment file not found"
  exit 1
fi

echo "Frontend setup completed successfully!" 