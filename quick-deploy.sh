#!/bin/bash

# SEI Institute Quick Deployment Script
# This script performs a quick deployment of the application without CI/CD setup
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

# Create connection script
create_connect_script() {
    section "CREATING SERVER CONNECTION SCRIPT"
    
    cat > connect-to-server.sh << EOF
#!/bin/bash
ssh root@$SERVER_IP
EOF
    chmod +x connect-to-server.sh
    echo -e "${GREEN}Created connect-to-server.sh script${NC}"
}

# Initial server setup
server_setup() {
    section "SETTING UP SERVER"
    
    # Create server setup script
    cat > server_setup.sh << 'EOF'
#!/bin/bash

# Update system
apt-get update && apt-get upgrade -y

# Install dependencies
apt-get install -y curl wget git nginx certbot python3-certbot-nginx

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Docker
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create project directories
mkdir -p /var/www/sei-institute
mkdir -p /var/www/sei-institute/client
mkdir -p /var/www/sei-institute/backend
mkdir -p /var/www/sei-institute/nginx/conf.d
mkdir -p /var/www/sei-institute/nginx/ssl
mkdir -p /var/www/sei-institute/uploads
chmod -R 755 /var/www
EOF

    # Upload and execute server setup script
    echo -e "${YELLOW}Setting up server...${NC}"
    sshpass -p "$SERVER_PASSWORD" scp server_setup.sh $SERVER_USER@$SERVER_IP:/root/
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "chmod +x /root/server_setup.sh && /root/server_setup.sh"
    rm server_setup.sh
}

# Configure Nginx
configure_nginx() {
    section "CONFIGURING NGINX"
    
    # Create Nginx configuration file
    cat > nginx.conf << EOF
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
    
    location /uploads {
        alias /var/www/sei-institute/uploads;
        expires 1d;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

    # Upload and apply Nginx configuration
    echo -e "${YELLOW}Configuring Nginx...${NC}"
    sshpass -p "$SERVER_PASSWORD" scp nginx.conf $SERVER_USER@$SERVER_IP:/etc/nginx/sites-available/$DOMAIN.conf
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/$DOMAIN.conf /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl reload nginx"
    rm nginx.conf
}

# Setup SSL with Certbot
setup_ssl() {
    section "SETTING UP SSL"
    
    echo -e "${YELLOW}Setting up SSL with Certbot...${NC}"
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN"
}

# Create Docker Compose file
create_docker_compose() {
    section "CREATING DOCKER COMPOSE"
    
    cat > docker-compose.yml << EOF
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: sei_postgres
    restart: always
    environment:
      POSTGRES_USER: $DB_USER
      POSTGRES_PASSWORD: $DB_PASSWORD
      POSTGRES_DB: $DB_NAME
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - sei_network

  backend:
    build: ./backend
    container_name: sei_backend
    restart: always
    ports:
      - "9000:9000"
    environment:
      NODE_ENV: production
      PORT: 9000
      DATABASE_URL: postgresql://$DB_USER:$DB_PASSWORD@postgres:5432/$DB_NAME?schema=public
      CLIENT_ENDPOINT: https://$DOMAIN
      JWT_SECRET: $JWT_SECRET
      ACCESS_TOKEN_EXPIRES: 1d
      REFRESH_TOKEN_EXPIRES: 7d
    volumes:
      - ./uploads:/app/uploads
    depends_on:
      - postgres
    networks:
      - sei_network

  frontend:
    build: ./client
    container_name: sei_frontend
    restart: always
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_BASE_URL: https://$DOMAIN/api/v1
      NEXT_PUBLIC_IMAGE_BASE_URL: https://$DOMAIN
    networks:
      - sei_network

networks:
  sei_network:
    driver: bridge

volumes:
  postgres_data:
EOF

    # Upload Docker Compose file
    echo -e "${YELLOW}Uploading Docker Compose configuration...${NC}"
    sshpass -p "$SERVER_PASSWORD" scp docker-compose.yml $SERVER_USER@$SERVER_IP:/var/www/sei-institute/
    rm docker-compose.yml
}

# Add environment variables
setup_env_files() {
    section "SETTING UP ENVIRONMENT FILES"
    
    # Backend .env file
    echo -e "${YELLOW}Creating backend .env file...${NC}"
    cat > backend.env << EOF
PORT=9000
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@postgres:5432/$DB_NAME?schema=public
CLIENT_ENDPOINT=https://$DOMAIN
JWT_SECRET=$JWT_SECRET
ACCESS_TOKEN_EXPIRES=1d
REFRESH_TOKEN_EXPIRES=7d
NODE_ENV=production
EOF
    
    # Frontend .env file
    echo -e "${YELLOW}Creating frontend .env file...${NC}"
    cat > frontend.env << EOF
NEXT_PUBLIC_API_BASE_URL=https://$DOMAIN/api/v1
NEXT_PUBLIC_IMAGE_BASE_URL=https://$DOMAIN
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drck1abnz
NEXT_PUBLIC_CLOUDINARY_API_KEY=845419969338617
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=sei_institute
EOF
    
    # Upload environment files
    sshpass -p "$SERVER_PASSWORD" scp backend.env $SERVER_USER@$SERVER_IP:/var/www/sei-institute/backend/.env
    sshpass -p "$SERVER_PASSWORD" scp frontend.env $SERVER_USER@$SERVER_IP:/var/www/sei-institute/client/.env.production
    
    # Cleanup local files
    rm backend.env frontend.env
}

# Deploy applications
deploy_apps() {
    section "DEPLOYING APPLICATIONS"
    
    echo -e "${YELLOW}Copying client files to server...${NC}"
    sshpass -p "$SERVER_PASSWORD" rsync -avz --exclude 'node_modules' --exclude '.next' ./client/ $SERVER_USER@$SERVER_IP:/var/www/sei-institute/client/
    
    echo -e "${YELLOW}Copying backend files to server...${NC}"
    sshpass -p "$SERVER_PASSWORD" rsync -avz --exclude 'node_modules' --exclude 'dist' ./backend/ $SERVER_USER@$SERVER_IP:/var/www/sei-institute/backend/
    
    echo -e "${YELLOW}Starting Docker containers...${NC}"
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "cd /var/www/sei-institute && docker-compose up -d --build"
}

# Database migration
run_migrations() {
    section "RUNNING DATABASE MIGRATIONS"
    
    echo -e "${YELLOW}Running database migrations...${NC}"
    sshpass -p "$SERVER_PASSWORD" ssh $SERVER_USER@$SERVER_IP "docker exec sei_backend npx prisma migrate deploy"
}

# Create script to check logs
create_log_script() {
    section "CREATING LOG SCRIPT"
    
    cat > check-logs.sh << EOF
#!/bin/bash
ssh root@$SERVER_IP "cd /var/www/sei-institute && docker-compose logs -f \$1"
EOF
    chmod +x check-logs.sh
    echo -e "${GREEN}Created check-logs.sh script (usage: ./check-logs.sh [service_name])${NC}"
}

# Create script to restart services
create_restart_script() {
    section "CREATING RESTART SCRIPT"
    
    cat > restart-services.sh << EOF
#!/bin/bash
ssh root@$SERVER_IP "cd /var/www/sei-institute && docker-compose restart \$1"
EOF
    chmod +x restart-services.sh
    echo -e "${GREEN}Created restart-services.sh script (usage: ./restart-services.sh [service_name])${NC}"
}

# Main function
main() {
    check_sshpass
    create_connect_script
    server_setup
    configure_nginx
    setup_ssl
    create_docker_compose
    setup_env_files
    deploy_apps
    run_migrations
    create_log_script
    create_restart_script
    
    section "DEPLOYMENT COMPLETED"
    echo -e "${GREEN}SEI Institute has been successfully deployed!${NC}"
    echo -e "${YELLOW}Website URL: https://$DOMAIN${NC}"
    echo -e "${YELLOW}Server IP: $SERVER_IP${NC}"
    
    echo -e "\n${GREEN}HELPER SCRIPTS:${NC}"
    echo -e "1. ./connect-to-server.sh - Connect to the server via SSH"
    echo -e "2. ./check-logs.sh - View the logs (usage: ./check-logs.sh [service_name])"
    echo -e "3. ./restart-services.sh - Restart services (usage: ./restart-services.sh [service_name])"
}

# Execute main function
main 