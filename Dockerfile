FROM node:18.16.0-alpine

RUN mkdir -p /workdir/app

COPY . /workdir/app

WORKDIR /workdir/app

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]