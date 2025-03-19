#!/bin/bash

# Script to connect to the SEI Institute server
SERVER_IP="37.27.247.208"
SERVER_USER="root"
SERVER_PASSWORD="gkjaRhMActfMatPW7nvd"

# Display help message
show_help() {
  echo "SEI Institute Server Connection Script"
  echo "-------------------------------------"
  echo "Usage: ./connect-to-server.sh [OPTION]"
  echo ""
  echo "Options:"
  echo "  -h, --help         Show this help message"
  echo "  -s, --ssh          Connect via SSH (default)"
  echo "  -c, --copy-key     Generate and copy SSH key for passwordless login"
  echo "  -f, --check        Check server status without connecting"
  echo "  -t, --tunnel PORT  Create SSH tunnel for the specified port"
  echo ""
  echo "Examples:"
  echo "  ./connect-to-server.sh              # Simple SSH connection"
  echo "  ./connect-to-server.sh --copy-key   # Set up passwordless login"
  echo "  ./connect-to-server.sh -t 3000      # Tunnel local port 3000 to server port 3000"
}

# Check server status
check_server() {
  echo "Checking connection to $SERVER_IP..."
  ping -c 1 $SERVER_IP > /dev/null 2>&1
  
  if [ $? -eq 0 ]; then
    echo "✅ Server is reachable"
    return 0
  else
    echo "❌ Server is not reachable"
    return 1
  fi
}

# Generate and copy SSH key
setup_ssh_key() {
  if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Generating new SSH key..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
  fi
  
  echo "Copying SSH key to the server..."
  cat ~/.ssh/id_rsa.pub | ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
  
  if [ $? -eq 0 ]; then
    echo "✅ SSH key installed successfully"
    echo "You can now log in without a password"
  else
    echo "❌ Failed to install SSH key"
  fi
}

# Create SSH tunnel
create_tunnel() {
  local port=$1
  echo "Creating SSH tunnel from local port $port to server port $port..."
  ssh -L $port:localhost:$port -N -f $SERVER_USER@$SERVER_IP
  
  if [ $? -eq 0 ]; then
    echo "✅ Tunnel created successfully"
    echo "You can now access the server's port $port at localhost:$port"
  else
    echo "❌ Failed to create tunnel"
  fi
}

# Connect via SSH
connect_ssh() {
  echo "Connecting to SEI Institute server at $SERVER_IP..."
  ssh $SERVER_USER@$SERVER_IP
  
  # If the connection fails, this code will execute
  if [ $? -ne 0 ]; then
    echo "❌ Failed to connect to the server. Please check your network connection or server status."
    exit 1
  fi
}

# Parse command line options
case "$1" in
  -h|--help)
    show_help
    exit 0
    ;;
  -c|--copy-key)
    setup_ssh_key
    exit 0
    ;;
  -f|--check)
    check_server
    exit 0
    ;;
  -t|--tunnel)
    check_server && create_tunnel "$2"
    exit 0
    ;;
  *)
    # Default: connect via SSH
    check_server && connect_ssh
    ;;
esac 