FROM node:alpine

RUN mkdir -p /app
WORKDIR /app
COPY . /app

ENV NODE_ENV production

EXPOSE 3000
CMD npm start
