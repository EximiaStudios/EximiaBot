FROM node:12-alpine

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install --only=production

COPY ./app /app

ENTRYPOINT ["node"]
CMD ["./src/index.js"]