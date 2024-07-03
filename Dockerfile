FROM node:20.10-alpine AS build

ENV TZ=Asia/Bangkok

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

RUN ls -la

FROM nginx:alpine

WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

