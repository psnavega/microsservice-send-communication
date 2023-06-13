FROM node:18.10

WORKDIR /usr/src/app

COPY package*.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile

RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
