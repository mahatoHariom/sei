FROM node:20-alpine

WORKDIR /app

# Install Python and build tools for Prisma
RUN apk add --no-cache python3 make g++ postgresql-client

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start:dev"]