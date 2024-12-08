# Step 1: Use the base node image
FROM node:20-alpine AS base

# Step 2: Install dependencies only when needed (this is done in a separate stage to optimize caching)
FROM base AS deps
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 3: Rebuild the source code (copy source code and build it)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:9000/api/v1
ENV NODE_ENV=production

# Build the application (it runs npm run build)
RUN npm run build

# Step 4: Production image, copy the built application and all necessary files
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built application and necessary assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# The container should run the "dev" script in production (change this to "start" in production mode)
CMD ["npm", "run", "start"]
