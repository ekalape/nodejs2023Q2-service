FROM node:18-alpine3.17

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# If you are building your code for production
#RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 4000

RUN npm run build

#CMD [ "node", "dist/main.js" ]
CMD [ "npm", "run", "start:dev" ]