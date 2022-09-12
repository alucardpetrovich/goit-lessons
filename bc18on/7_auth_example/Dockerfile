FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm i

COPY tsconfig.json .
COPY src/. src/.

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm i --only=prod

COPY --from=build /app/dist/. dist/.

CMD node dist/src/start.js
