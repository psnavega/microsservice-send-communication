FROM node:18.10 AS builder
WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./
RUN npm install

COPY . .
ARG ENVIRONMENT
RUN npm run build:${ENVIRONMENT}

FROM node:18.10 AS local

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install

RUN npm run build:local

COPY . .

CMD [ "npm", "run", "start" ]

FROM node:18.10 AS development
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

RUN apt-get update && apt-get install -y nginx \
    && apt-get clean

RUN rm /etc/nginx/sites-enabled/default
COPY docker/nginx.conf /etc/nginx/conf.d/

CMD service nginx start && npx prisma generate && node ./dist/src/main.js

EXPOSE 80
