FROM node:14-slim

WORKDIR /app

RUN npm install -g localtunnel

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]

