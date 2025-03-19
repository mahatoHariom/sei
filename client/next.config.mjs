/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // This creates a standalone build that's optimized for production
    
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com", // Already included
            },
            {
                protocol: "http", // Fastify server uses HTTP
                hostname: "localhost", // Fastify server hostname
                port: "9000", // Fastify server port
                pathname: "/uploads/**", // Path for uploaded files
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
                port: '',
                pathname: '**',
                
             
            },
        ],
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
