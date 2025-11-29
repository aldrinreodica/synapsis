FROM node:22.18.0-alpine AS base

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install 


FROM node:22.18.0-alpine 

WORKDIR /app

COPY . .

COPY --from=base /app/node_modules ./node_modules

EXPOSE 5000

CMD [ "npm", "run", "dev" ]