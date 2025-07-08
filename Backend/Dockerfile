# Dockerfile

# Use Node.js LTS base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose your app’s port (adjust if not 5050)
EXPOSE 5050

# Start the application
CMD ["node", "server.js"]

