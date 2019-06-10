#-- Build
FROM node:8-alpine
LABEL maintainer="naufal_yahaya@hotmail.com"

COPY . /src

WORKDIR /src

RUN npm install --production

ENV HOST 0.0.0.0
EXPOSE 3000

CMD npm start