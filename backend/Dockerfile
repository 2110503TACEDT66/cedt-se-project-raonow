# FROM...
FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the Express.js server
CMD ["node", "server.js"]
