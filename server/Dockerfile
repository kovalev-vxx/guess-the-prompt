FROM node:14-slim

WORKDIR /app

COPY yarn*.json ./

RUN yarn install
RUN yarn global add nodemon

COPY . .

EXPOSE 8000

CMD [ "nodemon", "app.js" ]
