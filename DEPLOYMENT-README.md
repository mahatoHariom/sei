# SEI Institute Deployment Guide

This guide provides instructions for deploying the SEI Institute application (client and backend) to your server. The deployment is configured for the domain `seiinstitute.com` on the server IP `37.27.247.208`.

## Requirements

- SSH access to your server
- Root or sudo privileges on the server
- A local machine with bash capabilities (Linux, macOS, or Windows with WSL)

## Deployment Options

We provide two deployment methods:

1. **Quick Deployment** - Simple direct deployment without CI/CD setup
2. **Full Deployment with CI/CD** - Complete deployment with GitHub Actions CI/CD pipeline

## 1. Quick Deployment

This method is straightforward and deploys the application directly from your local machine to the server.

### Steps:

1. Make sure the deployment script is executable:

   ```bash
   chmod +x quick-deploy.sh
   ```

2. Run the deployment script:

   ```bash
   ./quick-deploy.sh
   ```

3. The script will:

   - Setup the server with all required dependencies
   - Configure Nginx as a reverse proxy
   - Setup SSL with Certbot
   - Deploy the client and backend applications
   - Setup Docker Compose for containerization
   - Create helper scripts for managing the deployment

4. After completion, you'll have three helper scripts:
   - `connect-to-server.sh` - Connect to your server via SSH
   - `check-logs.sh` - View Docker container logs
   - `restart-services.sh` - Restart Docker services

### Using the Helper Scripts:

```bash
# Connect to the server
./connect-to-server.sh

# Check logs for all services
./check-logs.sh

# Check logs for a specific service (backend, frontend, postgres)
./check-logs.sh backend

# Restart all services
./restart-services.sh

# Restart a specific service
./restart-services.sh backend
```

## 2. Full Deployment with CI/CD

This method sets up a complete CI/CD pipeline using GitHub Actions, allowing automatic deployments when you push to the main branch.

### Steps:

1. Make sure the deployment script is executable:

   ```bash
   chmod +x deploy-sei-institute.sh
   ```

2. Run the deployment script:

   ```bash
   ./deploy-sei-institute.sh
   ```

3. The script will:

   - Setup the server with all required dependencies
   - Configure Nginx as a reverse proxy
   - Setup SSL with Certbot
   - Setup Docker Compose for containerization
   - Create Dockerfiles for client and backend if they don't exist
   - Configure GitHub Actions for CI/CD
   - Generate SSH keys for secure deployment
   - Deploy the application for the first time

4. After the script completes, you need to:
   - Add the displayed SSH private key to your GitHub repository secrets as `SSH_PRIVATE_KEY`
   - Push your code to the main branch to trigger automatic deployments

### Configuring GitHub Repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and Variables > Actions
3. Create a new repository secret named `SSH_PRIVATE_KEY`
4. Paste the SSH private key displayed by the script (without any extra spaces or newlines)
5. Save the secret

### Workflow:

- Every push to the main branch will trigger a deployment
- The GitHub Actions workflow will:
  - Copy the latest code to the server
  - Build the Docker containers
  - Restart the services
  - Apply any necessary database migrations

## Environment Variables

Both deployment methods automatically create appropriate environment files for the client and backend applications:

### Backend Environment Variables:

```
PORT=9000
DATABASE_URL=postgresql://sei_user:SEI_Secure_Password_2024@postgres:5432/sei_db?schema=public
CLIENT_ENDPOINT=https://seiinstitute.com
JWT_SECRET=[auto-generated]
ACCESS_TOKEN_EXPIRES=1d
REFRESH_TOKEN_EXPIRES=7d
NODE_ENV=production
```

### Client Environment Variables:

```
NEXT_PUBLIC_API_BASE_URL=https://seiinstitute.com/api/v1
NEXT_PUBLIC_IMAGE_BASE_URL=https://seiinstitute.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drck1abnz
NEXT_PUBLIC_CLOUDINARY_API_KEY=845419969338617
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=sei_institute
```

## Customizing the Deployment

If you need to customize the deployment, you can edit the deployment scripts:

- Change server IP, domain name, database credentials, etc. at the top of the script
- Modify Nginx configuration, Docker Compose setup, or environment variables as needed

## Server Maintenance

### Checking Logs:

```bash
# With the helper script (Quick Deployment)
./check-logs.sh [service_name]

# Directly on the server
docker-compose logs -f [service_name]
```

### Restarting Services:

```bash
# With the helper script (Quick Deployment)
./restart-services.sh [service_name]

# Directly on the server
cd /var/www/sei-institute
docker-compose restart [service_name]
```

### Updating the Application:

For Quick Deployment:

- Make changes to your local code
- Run the quick deployment script again

For CI/CD Deployment:

- Push changes to the main branch on GitHub
- GitHub Actions will automatically deploy the changes

## Troubleshooting

### Connection Issues:

- Make sure the server IP is correct
- Ensure SSH is properly configured on the server
- Check if the port 22 is open in the server firewall

### Deployment Failures:

- Check the logs of the deployment script
- For CI/CD, check the GitHub Actions workflow logs
- Ensure Docker is running properly on the server

### SSL Issues:

- Make sure your domain is pointing to the server IP
- Check if Certbot was able to issue certificates successfully
- Verify the Nginx configuration for SSL settings

### Database Issues:

- Check if the PostgreSQL container is running
- Verify the database connection string in the backend environment file
- Check the logs of the PostgreSQL container

## Security Considerations

- The deployment scripts contain sensitive information like passwords and SSH keys
- Keep these scripts secure and do not share them publicly
- Consider using environment variables or a more secure method to store sensitive information
- The server setup includes basic security configurations, but you might want to add more based on your requirements

## Conclusion

After completing the deployment, your SEI Institute application should be accessible at:

- Website: `https://seiinstitute.com`
- Backend API: `https://seiinstitute.com/api`

For any issues or questions, please refer to the troubleshooting section or contact support.
