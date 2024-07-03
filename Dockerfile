FROM node:20-alpine AS build

ENV TZ=Asia/Bangkok

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app

RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --configuration production

EXPOSE 4000

CMD ["yarn", "serve:ssr:ui", "--host", "0.0.0.0"]

