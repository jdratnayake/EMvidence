# Use Node.js official image
FROM node:21.2.0

RUN mkdir /frontend

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose port if needed (for example, if running a development server)
EXPOSE 3000

# Start the React app (replace this with your specific start command)
CMD npm start-watch
# CMD pwd && ls -lh