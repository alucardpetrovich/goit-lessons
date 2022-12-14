# FROM node:16-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm i

# COPY tsconfig.json ./
# COPY src/* ./src/*

# RUN npm run build

# CMD npm run start:prod

FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --only prod

COPY dist ./

CMD npm run start:prod
