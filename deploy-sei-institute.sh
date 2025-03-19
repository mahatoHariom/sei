#!/bin/bash

# SEI Institute Deployment Script
# This script will deploy both client and backend applications to your VPS
# Server IP: 37.27.247.208
# Domain: seiinstitute.com

set -e

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables
SERVER_IP="37.27.247.208"
SERVER_USER="root"
SERVER_PASSWORD="gkjaRhMActfMatPW7nvd"
DOMAIN="seiinstitute.com"
DB_USER="sei_user"
DB_PASSWORD="SEI_Secure_Password_2024"
DB_NAME="sei_db"
JWT_SECRET="sei_$(date +%s)_secret_key"

# Print section header
section() {
    echo -e "\n${BLUE}====== $1 ======${NC}\n"
}

# Check if sshpass is installed
check_sshpass() {
    if ! command -v sshpass &> /dev/null; then
        echo -e "${YELLOW}sshpass is not installed. Installing...${NC}"
        sudo apt-get update
        sudo apt-get install -y sshpass
    fi
}

# Initialize server setup
init_server() {
    section "INITIALIZING SERVER SETUP"
    
    echo -e "${GREEN}Connecting to server and setting up environment...${NC}"
    
    # Create setup script
    cat > server_setup.sh << 'EOF'
#!/bin/bash

set -e
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

echo "Installing essential tools..."
apt-get install -y git curl wget nano build-essential

echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "Installing PM2 for process management..."
npm install -g pm2

echo "Installing Docker and Docker Compose..."
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

echo "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "Installing Nginx..."
apt-get install -y nginx

echo "Creating project directories..."
mkdir -p /var/www/sei-institute
mkdir -p /var/www/sei-institute/client
mkdir -p /var/www/sei-institute/backend
mkdir -p /var/www/sei-institute/nginx/conf.d
mkdir -p /var/www/sei-institute/nginx/ssl
mkdir -p /var/www/sei-institute/nginx/logs
chmod -R 755 /var/www

echo "Installing Certbot for SSL..."
apt-get install -y certbot python3-certbot-nginx

echo "Server setup completed!"
EOF

    # Upload and execute the setup script
    echo -e "${YELLOW}Uploading and executing server setup script...${NC}"
    sshpass -p "$SERVER_PASSWORD" scp server_setup.sh $SERVER_USER@$SERVER_IP:/root/
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "chmod +x /root/server_setup.sh && /root/server_setup.sh"
    rm server_setup.sh
}

# Configure Nginx
configure_nginx() {
    section "CONFIGURING NGINX"
    
    # Create Nginx configuration file
    cat > nginx.conf << EOF
# Main domain configuration
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files and uploads
    location /uploads {
        alias /var/www/sei-institute/backend/uploads;
        expires 1d;
        add_header Cache-Control "public, max-age=86400";
    }

    # API endpoints
    location /api {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    # Upload Nginx configuration
    echo -e "${YELLOW}Uploading Nginx configuration...${NC}"
    sshpass -p "$SERVER_PASSWORD" scp nginx.conf $SERVER_USER@$SERVER_IP:/etc/nginx/sites-available/$DOMAIN.conf
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/$DOMAIN.conf /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl reload nginx"
    rm nginx.conf
}

# Setup SSL with Certbot
setup_ssl() {
    section "SETTING UP SSL CERTIFICATE"
    
    echo -e "${YELLOW}Setting up SSL with Certbot...${NC}"
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN"
}

# Setup Docker Compose
setup_docker_compose() {
    section "SETTING UP DOCKER COMPOSE"
    
    # Create Docker Compose configuration
    cat > docker-compose.yml << EOF
version: '3.8'

services:
  postgresql:
    image: postgres:15
    container_name: sei_postgres
    restart: always
    environment:
      POSTGRES_USER: $DB_USER
      POSTGRES_PASSWORD: $DB_PASSWORD
      POSTGRES_DB: $DB_NAME
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7
    container_name: sei_redis
    restart: always
    volumes:
      - redis-data:/data
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: sei_backend
    restart: always
    depends_on:
      - postgresql
      - redis
    ports:
      - "9000:9000"
    environment:
      - NODE_ENV=production
      - PORT=9000
      - DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@postgresql:5432/$DB_NAME?schema=public
      - CLIENT_ENDPOINT=https://$DOMAIN
      - JWT_SECRET=$JWT_SECRET
      - ACCESS_TOKEN_EXPIRES=1d
      - REFRESH_TOKEN_EXPIRES=7d
      - HUGGING_FACE_KEY=${HUGGING_FACE_KEY}
    volumes:
      - ./backend/uploads:/app/uploads
    networks:
      - app-network

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: sei_frontend
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=https://$DOMAIN/api/v1
      - NEXT_PUBLIC_IMAGE_BASE_URL=https://$DOMAIN
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
EOF

    # Upload Docker Compose file
    echo -e "${YELLOW}Uploading Docker Compose configuration...${NC}"
    sshpass -p "$SERVER_PASSWORD" scp docker-compose.yml $SERVER_USER@$SERVER_IP:/var/www/sei-institute/
    rm docker-compose.yml
}

# Create backend Dockerfile if not exists
create_backend_dockerfile() {
    section "CREATING BACKEND DOCKERFILE"
    
    # Check if Dockerfile exists in backend directory
    if [ ! -f "backend/Dockerfile" ]; then
        echo -e "${YELLOW}Creating Dockerfile for backend...${NC}"
        cat > backend/Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Expose port
EXPOSE 9000

# Start application
CMD ["npm", "run", "start:prod"]
EOF
    else
        echo -e "${GREEN}Backend Dockerfile already exists. Skipping creation.${NC}"
    fi
}

# Create client Dockerfile if not exists
create_client_dockerfile() {
    section "CREATING CLIENT DOCKERFILE"
    
    # Check if Dockerfile exists in client directory
    if [ ! -f "client/Dockerfile" ]; then
        echo -e "${YELLOW}Creating Dockerfile for client...${NC}"
        cat > client/Dockerfile << 'EOF'
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
EOF
    else
        echo -e "${GREEN}Client Dockerfile already exists. Skipping creation.${NC}"
    fi
}

# Setup GitHub Actions for CI/CD
setup_github_actions() {
    section "SETTING UP GITHUB ACTIONS"
    
    # Create GitHub Actions directory if not exists
    mkdir -p .github/workflows
    
    # Create workflow file
    cat > .github/workflows/deploy.yml << EOF
name: Deploy SEI Institute

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Setup SSH
      uses: webfactory/ssh-agent@v0.7.0
      with:
        ssh-private-key: \${{ secrets.SSH_PRIVATE_KEY }}
    
    - name: Add known hosts
      run: ssh-keyscan $SERVER_IP >> ~/.ssh/known_hosts
    
    - name: Copy Code to Server
      run: |
        rsync -avz --exclude 'node_modules' --exclude '.next' ./client/ root@$SERVER_IP:/var/www/sei-institute/client/
        rsync -avz --exclude 'node_modules' --exclude 'dist' ./backend/ root@$SERVER_IP:/var/www/sei-institute/backend/
    
    - name: Build and Deploy
      run: |
        ssh root@$SERVER_IP "cd /var/www/sei-institute && docker-compose down && docker-compose build && docker-compose up -d"
EOF

    echo -e "${GREEN}GitHub Actions workflow created at .github/workflows/deploy.yml${NC}"
    echo -e "${YELLOW}NOTE: You need to add SSH_PRIVATE_KEY secret in your GitHub repository settings to enable CI/CD${NC}"
}

# Create backend .env for production
create_backend_env() {
    section "CREATING BACKEND ENVIRONMENT FILE"
    
    cat > backend/backend.env << EOF
PORT=9000
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@postgresql:5432/$DB_NAME?schema=public
CLIENT_ENDPOINT=https://$DOMAIN
JWT_SECRET=$JWT_SECRET
ACCESS_TOKEN_EXPIRES=1d
REFRESH_TOKEN_EXPIRES=7d
NODE_ENV=production
HUGGING_FACE_KEY=${HUGGING_FACE_KEY}
EOF

    echo -e "${GREEN}Backend environment file created at backend/backend.env${NC}"
}

# Create client .env.production
create_client_env() {
    section "CREATING CLIENT ENVIRONMENT FILE"
    
    cat > client/.env.production << EOF
NEXT_PUBLIC_API_BASE_URL=https://$DOMAIN/api/v1
NEXT_PUBLIC_IMAGE_BASE_URL=https://$DOMAIN
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drck1abnz
NEXT_PUBLIC_CLOUDINARY_API_KEY=845419969338617
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=sei_institute
EOF

    echo -e "${GREEN}Client environment file created at client/.env.production${NC}"
}

# Deploy applications to server
deploy_apps() {
    section "DEPLOYING APPLICATIONS"
    
    echo -e "${YELLOW}Copying client files to server...${NC}"
    sshpass -p "$SERVER_PASSWORD" rsync -avz --exclude 'node_modules' --exclude '.next' ./client/ $SERVER_USER@$SERVER_IP:/var/www/sei-institute/client/
    
    echo -e "${YELLOW}Copying backend files to server...${NC}"
    sshpass -p "$SERVER_PASSWORD" rsync -avz --exclude 'node_modules' --exclude 'dist' ./backend/ $SERVER_USER@$SERVER_IP:/var/www/sei-institute/backend/
    
    echo -e "${YELLOW}Building and starting Docker containers...${NC}"
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "cd /var/www/sei-institute && docker-compose up -d --build"
}

# Setup SSH key for GitHub Actions
setup_ssh_key() {
    section "SETTING UP SSH KEY FOR CI/CD"
    
    # Create SSH key if it doesn't exist
    if [ ! -f ~/.ssh/id_rsa_sei ]; then
        echo -e "${YELLOW}Generating SSH key for CI/CD...${NC}"
        ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_sei -N "" -C "deploy@seiinstitute.com"
        
        # Display public key
        echo -e "${GREEN}Public SSH key generated. Add this key to your server's authorized_keys:${NC}"
        cat ~/.ssh/id_rsa_sei.pub
        
        # Display private key
        echo -e "${GREEN}Private SSH key. Add this as a secret in your GitHub repository:${NC}"
        cat ~/.ssh/id_rsa_sei
        
        # Add key to server
        echo -e "${YELLOW}Adding public key to server...${NC}"
        sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "mkdir -p ~/.ssh && chmod 700 ~/.ssh"
        sshpass -p "$SERVER_PASSWORD" scp ~/.ssh/id_rsa_sei.pub $SERVER_USER@$SERVER_IP:~/.ssh/authorized_keys
        sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "chmod 600 ~/.ssh/authorized_keys"
    else
        echo -e "${GREEN}SSH key already exists at ~/.ssh/id_rsa_sei${NC}"
    fi
}

# Main function
main() {
    check_sshpass
    init_server
    configure_nginx
    setup_ssl
    create_backend_dockerfile
    create_client_dockerfile
    create_backend_env
    create_client_env
    setup_docker_compose
    setup_github_actions
    setup_ssh_key
    deploy_apps
    
    section "DEPLOYMENT COMPLETED"
    echo -e "${GREEN}SEI Institute has been successfully deployed!${NC}"
    echo -e "${YELLOW}Website URL: https://$DOMAIN${NC}"
    echo -e "${YELLOW}Server IP: $SERVER_IP${NC}"
    
    echo -e "\n${GREEN}IMPORTANT NEXT STEPS:${NC}"
    echo -e "1. Add the SSH private key to your GitHub repository as a secret named SSH_PRIVATE_KEY"
    echo -e "2. Push your code to the main branch to trigger the CI/CD pipeline"
    echo -e "3. Monitor the deployment on GitHub Actions"
    echo -e "4. Check the logs on the server with 'docker-compose logs -f' to ensure everything is running correctly"
}

# Execute main function
main 