# Quick Deployment Guide for SEI Institute

This quick reference guide provides essential commands for deploying your full-stack application.

## Server Information

- IP: 37.27.247.208
- User: root
- Password: gkjaRhMActfMatPW7nvd

## First-time Setup

```bash
# 1. SSH into your server
ssh root@37.27.247.208

# 2. Create directories
mkdir -p /root/scripts
mkdir -p /root/sei-institute

# 3. Exit and upload scripts
exit
scp scripts/setup-fullstack.sh root@37.27.247.208:/root/scripts/
scp scripts/connect-to-server.sh root@37.27.247.208:/root/scripts/

# 4. Connect again and run setup
ssh root@37.27.247.208
chmod +x /root/scripts/*.sh
/root/scripts/setup-fullstack.sh
```

## Repository Setup

```bash
# Setup SSH key for GitHub Actions (from your local machine)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub root@37.27.247.208

# Add the following secrets to your GitHub repositories
# SSH_PRIVATE_KEY: $(cat ~/.ssh/github_actions_deploy)
```

## Manual Deployment Steps

```bash
# Clone repositories
cd /root/sei-institute
git clone <frontend-repo-url> client
git clone <backend-repo-url> server

# Setup environment files
cd /root/sei-institute/client
cp .env.production.example .env.production
nano .env.production

cd /root/sei-institute/server
cp .env.example .env
nano .env

cd /root/sei-institute
cp .env.example .env
nano .env

# Deploy all services
docker-compose up -d
```

## Common Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f nextjs-app  # Frontend
docker-compose logs -f backend-api  # Backend

# Restart services
docker-compose restart nginx
docker-compose restart nextjs-app
docker-compose restart backend-api

# Update and rebuild
docker-compose down
docker-compose up -d --build
```

## Checking Status

```bash
# Check if Nginx is configured correctly
docker-compose exec nginx nginx -t

# Check database connection
docker-compose exec backend-api ping mongo

# Monitor system resources
htop
```

## Security

```bash
# Change root password
passwd

# Setup basic firewall (allows SSH, HTTP, HTTPS)
apt-get install ufw
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

## Troubleshooting

If services don't start:

1. Check logs: `docker-compose logs <service-name>`
2. Verify environment variables are set correctly
3. Ensure ports are not in use: `netstat -tulpn`
4. Check disk space: `df -h`

If site is unreachable:

1. Check if containers are running: `docker ps`
2. Verify Nginx is running: `docker-compose ps nginx`
3. Check firewall status: `ufw status`
