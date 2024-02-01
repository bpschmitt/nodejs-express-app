FROM node:bullseye-slim

WORKDIR /usr/src/app

COPY index.js /usr/src/app
COPY package.json /usr/src/app

RUN npm install
CMD "node" "index.js"
