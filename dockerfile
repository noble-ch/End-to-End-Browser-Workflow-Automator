# Use the official Node.js 18 base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
