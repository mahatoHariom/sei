# Full-Stack Deployment Guide for SEI Institute

This guide provides detailed instructions for deploying both the Next.js client application and the backend API on your server with Continuous Integration/Continuous Deployment (CI/CD).

## Server Information

- IPv4: 37.27.247.208
- IPv6: 2a01:4f9:c012:3cd4::/64
- Username: root
- Password: gkjaRhMActfMatPW7nvd

## Architecture Overview

This deployment consists of the following components:

1. **Next.js Frontend** - A client-side application
2. **Backend API** - A Node.js/Express API server
3. **MongoDB** - A NoSQL database for data storage
4. **Nginx** - A web server and reverse proxy that routes traffic to the appropriate service
5. **Docker & Docker Compose** - Containerization platform to manage services

## Prerequisites

1. GitHub repositories for both frontend and backend code
2. SSH access to your server
3. Basic understanding of Docker and Nginx

## Getting Started

### 1. Initial Server Setup

First, connect to your server and run the setup script:

```bash
# Connect to your server
ssh root@37.27.247.208

# Create script directory
mkdir -p /root/scripts

# Exit the server
exit

# Copy the setup script to your server
scp scripts/setup-fullstack.sh root@37.27.247.208:/root/scripts/

# Connect to your server again
ssh root@37.27.247.208

# Make the script executable and run it
chmod +x /root/scripts/setup-fullstack.sh
/root/scripts/setup-fullstack.sh
```

This script will:

- Update your system
- Install Docker and Docker Compose
- Create required directories
- Set up SSL certificates
- Configure Nginx
- Create Docker Compose configuration
- Generate environment file templates
- Create backend Dockerfile and GitHub workflow templates

### 2. Setting Up GitHub Actions for CI/CD

To enable automatic deployment for both frontend and backend, you need to set up GitHub Actions:

#### Generate SSH Key

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Upload the public key to your server
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@37.27.247.208
```

#### Add GitHub Secrets

Add the following secrets to both your frontend and backend GitHub repositories:

**Common Secrets:**

- `SSH_PRIVATE_KEY`: The content of your SSH private key (`cat ~/.ssh/github_actions_deploy`)

**Frontend Secrets:**

- `NEXT_PUBLIC_API_BASE_URL`: `https://37.27.247.208/api/v1`
- `NEXT_PUBLIC_IMAGE_BASE_URL`: `https://37.27.247.208`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`: Your Cloudinary API key
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset

**Backend Secrets:**

- `PORT`: `9000`
- `JWT_SECRET`: A secure random string
- `ORIGIN`: `https://37.27.247.208`
- `MONGODB_URI`: `mongodb://mongo:27017/sei_db`
- `MONGO_USERNAME`: Your MongoDB username
- `MONGO_PASSWORD`: Your MongoDB password
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### 3. Environment Files Setup

Create proper environment files on your server:

#### Frontend (.env.production)

```bash
cd /root/sei-institute/client
cp .env.production.example .env.production
nano .env.production
```

Update the values with your actual production settings.

#### Backend (.env)

```bash
cd /root/sei-institute/server
cp .env.example .env
nano .env
```

Update the values with your actual production settings.

#### Root .env (for Docker Compose)

```bash
cd /root/sei-institute
cp .env.example .env
nano .env
```

This file contains environment variables used by Docker Compose.

### 4. Preparing Docker Files

#### Backend Dockerfile

```bash
cd /root/sei-institute/server
cp Dockerfile.example Dockerfile
```

Modify the Dockerfile if necessary to match your backend application's structure.

### 5. Manual Deployment (First Time)

Before setting up automatic deployment, you might want to deploy manually first:

#### Frontend

```bash
cd /root/sei-institute
git clone <your-frontend-repo-url> client
cd client
# Copy the existing Dockerfile from our setup
```

#### Backend

```bash
cd /root/sei-institute
git clone <your-backend-repo-url> server
cd server
# Copy the Dockerfile.example to Dockerfile if necessary
```

#### Deploy All Services

```bash
cd /root/sei-institute
docker-compose up -d
```

This will build and start all containers.

### 6. Accessing Your Application

After deployment, your application will be available at:

- Frontend: https://37.27.247.208
- Backend API: https://37.27.247.208/api

## SSL Certificates

The setup script generates a self-signed SSL certificate. For production, replace it with a valid certificate:

```bash
# Install Certbot
apt-get install certbot python3-certbot-nginx

# Stop Nginx temporarily
docker-compose stop nginx

# Get certificate
certbot certonly --standalone -d yourdomain.com

# Copy certificates to the right location
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /root/sei-institute/client/nginx/ssl/certificate.crt
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /root/sei-institute/client/nginx/ssl/private.key

# Restart Nginx
docker-compose up -d nginx
```

## Monitoring and Logs

### View Container Status

```bash
docker ps
docker-compose ps
```

### View Container Logs

```bash
# Frontend logs
docker-compose logs -f nextjs-app

# Backend logs
docker-compose logs -f backend-api

# Nginx logs
docker-compose logs -f nginx

# MongoDB logs
docker-compose logs -f mongo
```

## Backups

### MongoDB Backup

```bash
# Create backup directory
mkdir -p /root/backups

# Backup MongoDB data
docker-compose exec mongo mongodump --username $MONGO_USERNAME --password $MONGO_PASSWORD --out /data/db/backup

# Copy backup files from container to host
docker cp $(docker-compose ps -q mongo):/data/db/backup /root/backups/$(date +%Y%m%d)
```

## Common Issues and Troubleshooting

### Container Won't Start

Check the logs:

```bash
docker-compose logs <service-name>
```

### Nginx Configuration Issues

Check the Nginx configuration:

```bash
docker-compose exec nginx nginx -t
```

### Database Connection Issues

Verify MongoDB is running:

```bash
docker-compose ps mongo
```

Check connection from backend:

```bash
docker-compose exec backend-api ping mongo
```

## Security Considerations

1. **Change Default Passwords**:

   ```bash
   passwd root
   ```

2. **Setup Firewall**:

   ```bash
   apt-get install ufw
   ufw default deny incoming
   ufw default allow outgoing
   ufw allow ssh
   ufw allow http
   ufw allow https
   ufw enable
   ```

3. **Setup Fail2ban** to prevent brute force attacks:

   ```bash
   apt-get install fail2ban
   systemctl enable fail2ban
   systemctl start fail2ban
   ```

4. **Regular Updates**:
   ```bash
   apt-get update
   apt-get upgrade
   ```

## Maintenance

### Updating the Application

When using CI/CD, simply push to your main branch, and the application will update automatically.

For manual updates:

```bash
# Frontend
cd /root/sei-institute/client
git pull
cd /root/sei-institute
docker-compose up -d --build nextjs-app

# Backend
cd /root/sei-institute/server
git pull
cd /root/sei-institute
docker-compose up -d --build backend-api
```

### Restarting Services

```bash
docker-compose restart <service-name>
```

### Complete Rebuild

```bash
docker-compose down
docker-compose up -d --build
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
