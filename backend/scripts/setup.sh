#!/bin/bash

# Backend Setup Script
echo "Starting backend setup..."

# Install dependencies
npm ci

# Create production .env file
cat > .env.production << EOL
PORT=9000
DATABASE_URL=postgresql://sei_user:${DB_PASSWORD}@localhost:5432/sei_institute
CLIENT_ENDPOINT="https://seiinstitute.com"
JWT_SECRET="${JWT_SECRET}"
ACCESS_TOKEN_EXPIRES="1d"
REFRESH_TOKEN_EXPIRES="7d"
NODE_ENV="production"
POSTGRES_HOST_AUTH_METHOD="trust"
HUGGING_FACE_KEY="${HUGGING_FACE_KEY}"
EOL

# Copy production env
cp .env.production .env

# Build the application
npm run build

# Run database migrations
npx prisma generate
npx prisma migrate deploy

# Setup PM2
npm install pm2 -g
pm2 restart backend || pm2 start npm --name "backend" -- start
pm2 save

# Verify environment variables
echo "Verifying environment variables..."
if [ -f ".env" ]; then
  echo "Environment file exists"
  # Check critical variables
  if grep -q "DATABASE_URL" .env && grep -q "JWT_SECRET" .env && grep -q "NODE_ENV=production" .env; then
    echo "Critical environment variables are set"
  else
    echo "Error: Missing critical environment variables"
    exit 1
  fi
else
  echo "Error: Environment file not found"
  exit 1
fi

# Test database connection
echo "Testing database connection..."
if npx prisma db pull; then
  echo "Database connection successful"
else
  echo "Error: Database connection failed"
  exit 1
fi

echo "Backend setup completed successfully!" 