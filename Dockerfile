FROM node:lts-alpine

#RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install && npm cache clean --force

RUN npx prisma generate

COPY . .

EXPOSE ${PORT}

RUN npm run build


#CMD [ "node", "dist/main.js" ]
#CMD [ "npm", "run", "start:migrate-watch" ]