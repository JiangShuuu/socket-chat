FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8877

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]