#!/bin/bash

# Exit on error
set -e

# Server information
SERVER_IP="37.27.247.208"
SERVER_USER="root"
SERVER_PASSWORD="gkjaRhMActfMatPW7nvd"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Update system
update_system() {
  print_message "Updating system packages..."
  apt-get update
  apt-get upgrade -y
}

# Install Docker and Docker Compose
install_docker() {
  if ! command -v docker &> /dev/null; then
    print_message "Installing Docker..."
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
    # Add current user to docker group
    usermod -aG docker $USER
  else
    print_message "Docker is already installed"
  fi

  if ! command -v docker-compose &> /dev/null; then
    print_message "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
  else
    print_message "Docker Compose is already installed"
  fi
}

# Setup directories
setup_directories() {
  print_message "Creating required directories..."
  
  # Frontend directories
  mkdir -p /root/sei-institute/client
  mkdir -p /root/sei-institute/client/nginx/conf.d
  mkdir -p /root/sei-institute/client/nginx/ssl
  mkdir -p /root/sei-institute/client/nginx/www
  
  # Backend directories
  mkdir -p /root/sei-institute/server
  mkdir -p /root/sei-institute/server/uploads
  mkdir -p /root/sei-institute/server/logs
  mkdir -p /root/sei-institute/server/config
  
  # SSL directories
  mkdir -p /root/ssl
}

# Setup SSL certificates
setup_ssl() {
  print_message "Setting up SSL certificates..."
  
  # Generate self-signed certificate for development
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /root/sei-institute/client/nginx/ssl/private.key \
    -out /root/sei-institute/client/nginx/ssl/certificate.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
  
  print_message "Self-signed SSL certificate created"
  print_warning "For production, you should replace it with a valid certificate from Let's Encrypt"
}

# Setup Nginx with reverse proxy for both frontend and backend
setup_nginx_config() {
  print_message "Setting up Nginx configuration..."
  
  cat > /root/sei-institute/client/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    # Redirect HTTP to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name _;

    # SSL configuration
    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend - Next.js app
    location / {
        proxy_pass http://nextjs-app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API - Node.js/Express server
    location /api/ {
        proxy_pass http://backend-api:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend uploads - Static files
    location /uploads/ {
        proxy_pass http://backend-api:9000/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase body size for file uploads
    client_max_body_size 100M;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_disable "MSIE [1-6]\.";
}
EOF
  
  print_message "Nginx configuration created"
}

# Create docker-compose for the full stack
setup_docker_compose() {
  print_message "Setting up Docker Compose configuration..."
  
  cat > /root/sei-institute/docker-compose.yml << 'EOF'
version: '3'

services:
  # Frontend - Next.js application
  nextjs-app:
    build:
      context: ./client
      args:
        - NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
        - NEXT_PUBLIC_IMAGE_BASE_URL=${NEXT_PUBLIC_IMAGE_BASE_URL}
        - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        - NEXT_PUBLIC_CLOUDINARY_API_KEY=${NEXT_PUBLIC_CLOUDINARY_API_KEY}
        - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
    restart: always
    ports:
      - "3000:3000"
    env_file:
      - ./client/.env.production
    networks:
      - app-network
    depends_on:
      - backend-api

  # Backend - Node.js/Express API server
  backend-api:
    build:
      context: ./server
    restart: always
    ports:
      - "9000:9000"
    env_file:
      - ./server/.env
    volumes:
      - ./server/uploads:/app/uploads
      - ./server/logs:/app/logs
    networks:
      - app-network
    depends_on:
      - mongo

  # Database - MongoDB
  mongo:
    image: mongo:latest
    restart: always
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

  # Nginx - Web server and reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./client/nginx/conf.d:/etc/nginx/conf.d
      - ./client/nginx/ssl:/etc/nginx/ssl
      - ./client/nginx/www:/var/www/html
    depends_on:
      - nextjs-app
      - backend-api
    networks:
      - app-network
    restart: always

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:
    driver: local
EOF
  
  print_message "Docker Compose configuration created"
}

# Create environment files templates
setup_env_files() {
  print_message "Creating environment file templates..."
  
  # Frontend .env.production template
  cat > /root/sei-institute/client/.env.production.example << EOF
NEXT_PUBLIC_API_BASE_URL=https://${SERVER_IP}/api/v1
NEXT_PUBLIC_IMAGE_BASE_URL=https://${SERVER_IP}
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
EOF
  
  # Backend .env template
  cat > /root/sei-institute/server/.env.example << EOF
# Server configuration
PORT=9000
NODE_ENV=production
JWT_SECRET=change-this-to-a-secure-secret
ORIGIN=https://${SERVER_IP}

# MongoDB configuration
MONGODB_URI=mongodb://mongo:27017/sei_db
MONGO_USERNAME=admin
MONGO_PASSWORD=secure_password

# Storage configuration
UPLOAD_DIR=/app/uploads

# Cloudinary configuration (if used)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EOF
  
  # Root .env for docker-compose
  cat > /root/sei-institute/.env.example << EOF
# MongoDB credentials
MONGO_USERNAME=admin
MONGO_PASSWORD=secure_password

# Frontend environment variables
NEXT_PUBLIC_API_BASE_URL=https://${SERVER_IP}/api/v1
NEXT_PUBLIC_IMAGE_BASE_URL=https://${SERVER_IP}
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
EOF

  print_message "Environment file templates created"
  print_warning "Make sure to update these files with your actual values before deploying"
}

# Create a sample backend Dockerfile
create_backend_dockerfile() {
  print_message "Creating backend Dockerfile template..."
  
  cat > /root/sei-institute/server/Dockerfile.example << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create upload directory
RUN mkdir -p /app/uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=9000

# Expose the port
EXPOSE 9000

# Start the application
CMD ["node", "src/index.js"]
EOF
  
  print_message "Backend Dockerfile template created"
}

# Create a GitHub workflow for backend deployment
create_backend_workflow() {
  print_message "Creating GitHub workflow for backend deployment..."
  
  mkdir -p /root/sei-institute/server/.github/workflows
  
  cat > /root/sei-institute/server/.github/workflows/deploy.yml << 'EOF'
name: Deploy Backend API

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
      
      - name: Add SSH known hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H 37.27.247.208 >> ~/.ssh/known_hosts
      
      - name: Create .env file
        run: |
          echo "PORT=${{ secrets.PORT }}" > .env
          echo "NODE_ENV=production" >> .env
          echo "JWT_SECRET=${{ secrets.JWT_SECRET }}" >> .env
          echo "ORIGIN=${{ secrets.ORIGIN }}" >> .env
          echo "MONGODB_URI=${{ secrets.MONGODB_URI }}" >> .env
          echo "MONGO_USERNAME=${{ secrets.MONGO_USERNAME }}" >> .env
          echo "MONGO_PASSWORD=${{ secrets.MONGO_PASSWORD }}" >> .env
          echo "UPLOAD_DIR=/app/uploads" >> .env
          echo "CLOUDINARY_CLOUD_NAME=${{ secrets.CLOUDINARY_CLOUD_NAME }}" >> .env
          echo "CLOUDINARY_API_KEY=${{ secrets.CLOUDINARY_API_KEY }}" >> .env
          echo "CLOUDINARY_API_SECRET=${{ secrets.CLOUDINARY_API_SECRET }}" >> .env
      
      - name: Deploy to server
        run: |
          # Sync code to server
          rsync -avz --exclude 'node_modules' --exclude '.git' ./ root@37.27.247.208:/root/sei-institute/server/
          
          # Execute deploy commands on server
          ssh root@37.27.247.208 "cd /root/sei-institute && docker-compose up -d --build backend-api"
EOF
  
  print_message "Backend GitHub workflow created"
}

# Function to run all setup steps
run_setup() {
  print_message "Starting full-stack setup..."
  
  update_system
  install_docker
  setup_directories
  setup_ssl
  setup_nginx_config
  setup_docker_compose
  setup_env_files
  create_backend_dockerfile
  create_backend_workflow
  
  print_message "======================================"
  print_message "Full-stack setup completed successfully!"
  print_message "Next steps:"
  print_message "1. Copy your backend code to /root/sei-institute/server"
  print_message "2. Copy your frontend code to /root/sei-institute/client"
  print_message "3. Create proper .env files from the .env.example templates"
  print_message "4. Run 'cd /root/sei-institute && docker-compose up -d' to start all services"
  print_message "======================================"
}

# Run the setup
run_setup 