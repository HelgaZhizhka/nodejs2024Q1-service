FROM node:20.11.1-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --no-cache --virtual .build-deps python3 make g++ \
    && npm ci \
    && apk del .build-deps


FROM node:20.11.1-alpine AS development

WORKDIR /usr/app

COPY --from=builder /usr/app/node_modules ./node_modules

COPY . .

EXPOSE $APP_PORT

CMD ["npm", "run", "start:migrate:dev"]
