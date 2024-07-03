FROM node:16-alpine AS build

ENV TZ=Asia/Bangkok
# # Install base packages
# RUN apk update
# RUN apk upgrade
# RUN apk add ca-certificates && update-ca-certificates
# # Change TimeZone
# RUN apk add --update tzdata
# # Clean APK cache
# RUN rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app

#RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod

# RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod production

RUN ls -la

FROM nginx:alpine

WORKDIR /app
COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80
