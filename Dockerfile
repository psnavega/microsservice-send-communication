FROM node:18.10 AS builder
WORKDIR /usr/src/app

COPY package*.json yarn.lock tsconfig*.json ./
RUN yarn install --frozen-lockfile

COPY . .
ARG ENVIRONMENT
RUN yarn build:${ENVIRONMENT}

FROM node:18.10
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

RUN apt-get update && apt-get install -y nginx

RUN rm /etc/nginx/sites-enabled/default
COPY docker/nginx.conf /etc/nginx/conf.d/

CMD service nginx start && node ./dist/src/main.js

EXPOSE 80
