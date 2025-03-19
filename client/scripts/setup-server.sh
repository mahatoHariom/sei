#!/bin/bash

# Exit on error
set -e

# Update system
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create required directories
echo "Creating required directories..."
mkdir -p /root/sei-institute/client
mkdir -p /root/sei-institute/client/nginx/conf.d
mkdir -p /root/sei-institute/client/nginx/ssl
mkdir -p /root/sei-institute/client/nginx/www

# Set up self-signed SSL certificate (for development, replace with real certificate in production)
echo "Setting up SSL certificate..."
mkdir -p /root/sei-institute/client/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /root/sei-institute/client/nginx/ssl/private.key \
    -out /root/sei-institute/client/nginx/ssl/certificate.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Create a sample .env.production file
echo "Creating environment file template..."
cat > /root/sei-institute/client/.env.production.example << EOF
NEXT_PUBLIC_API_BASE_URL=http://api-server-url/api/v1
NEXT_PUBLIC_IMAGE_BASE_URL=http://api-server-url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
EOF

echo "Server setup completed!"
echo "Please edit the .env.production.example file with your actual values and rename it to .env.production"
echo "Then, you can push to your GitHub repository to trigger the deployment pipeline." 