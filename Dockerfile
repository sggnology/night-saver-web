FROM node:18.16.0-alpine

RUN mkdir -p /workdir/app

COPY . /workdir/app

WORKDIR /workdir/app

RUN npm install

CMD ["npm", "start"]