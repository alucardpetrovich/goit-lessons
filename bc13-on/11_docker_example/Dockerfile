FROM node:16-alpine

WORKDIR /server

COPY package*.json .

RUN npm i

COPY . .

CMD [ "node", "server.js" ]
