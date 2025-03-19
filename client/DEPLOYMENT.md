# Deployment Guide for SEI Institute Client Application

This guide will walk you through deploying the Next.js client application on your server with Continuous Integration/Continuous Deployment (CI/CD).

## Server Information

- IPv4: 37.27.247.208
- IPv6: 2a01:4f9:c012:3cd4::/64
- Username: root
- Password: gkjaRhMActfMatPW7nvd

## Prerequisites

1. A GitHub repository with your Next.js application code
2. SSH access to your server
3. Docker and Docker Compose installed on your server

## Initial Server Setup

1. Connect to your server using SSH:

```bash
ssh root@37.27.247.208
```

2. Clone this repository to your local machine and upload the setup script to your server:

```bash
scp scripts/setup-server.sh root@37.27.247.208:/root/
```

3. Make the script executable and run it:

```bash
chmod +x /root/setup-server.sh
./root/setup-server.sh
```

## Setting Up GitHub Actions

To enable automatic deployment when you push to your main branch, you need to set up GitHub Actions and configure repository secrets.

### Generate SSH Key for GitHub Actions

1. On your local machine, generate an SSH key:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

2. Upload the public key to your server:

```bash
ssh root@37.27.247.208 "mkdir -p ~/.ssh && chmod 700 ~/.ssh"
cat ~/.ssh/github_actions_deploy.pub | ssh root@37.27.247.208 "cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### Add GitHub Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

1. `SSH_PRIVATE_KEY`: The content of your SSH private key (`cat ~/.ssh/github_actions_deploy`)
2. `NEXT_PUBLIC_API_BASE_URL`: Your API server URL (e.g., `https://api.example.com/api/v1`)
3. `NEXT_PUBLIC_IMAGE_BASE_URL`: Your image server URL (e.g., `https://api.example.com`)
4. `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
5. `NEXT_PUBLIC_CLOUDINARY_API_KEY`: Your Cloudinary API key
6. `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset

## Environment Variables

Create a `.env.production` file on your server:

```bash
cd /root/sei-institute/client
cp .env.production.example .env.production
nano .env.production
```

Update the values to match your production environment.

## Manual Deployment

If you need to deploy manually instead of using CI/CD:

1. Clone your repository to your server:

```bash
cd /root/sei-institute
git clone <your-repo-url> client
cd client
```

2. Create a `.env.production` file with your environment variables.

3. Build and start the containers:

```bash
docker-compose up -d --build
```

## Accessing Your Application

After deployment, your application will be available at:

- HTTP: http://37.27.247.208 (will redirect to HTTPS)
- HTTPS: https://37.27.247.208

## SSL Certificates

The setup script generates a self-signed SSL certificate. For production, you should replace it with a valid certificate. You can obtain a free certificate from Let's Encrypt:

```bash
apt-get install certbot
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

Then, update the Nginx configuration to use the Let's Encrypt certificates.

## Troubleshooting

### Check container status:

```bash
docker ps
docker-compose ps
```

### View container logs:

```bash
docker-compose logs -f nextjs-app
docker-compose logs -f nginx
```

### Restart services:

```bash
docker-compose restart
```

### Rebuild and restart:

```bash
docker-compose down
docker-compose up -d --build
```

## Security Considerations

1. Change the default password for your root user
2. Set up a firewall to limit exposed ports
3. Configure fail2ban to prevent brute force attacks
4. Regularly update your server and applications
