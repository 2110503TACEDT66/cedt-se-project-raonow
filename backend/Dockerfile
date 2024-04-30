# FROM...
FROM node:21-alpine

# Create app directory
ADD . /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install 

# Bundle app source
CMD [ "node", "/app/server.js" ]