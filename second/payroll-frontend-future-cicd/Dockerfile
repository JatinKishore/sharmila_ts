FROM node:20-alpine

WORKDIR /app

COPY *.json ./

RUN npm install --legacy-peer-deps \
    && npm install @angular-devkit/build-angular --force

COPY . .

EXPOSE 4000

CMD ["npm","start"]
