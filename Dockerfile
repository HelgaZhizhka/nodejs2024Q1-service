FROM node:20.11.1-alpine 

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE $APP_PORT

CMD ["npm", "run", "start:dev"]
