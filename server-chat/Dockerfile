FROM node:14-alpine

WORKDIR /app

COPY /server-chat .

EXPOSE 8877

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]