FROM node:14.14.0-alpine

ENV CI=true
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY ./ ./

CMD [ "npm", "run", "dev" ]