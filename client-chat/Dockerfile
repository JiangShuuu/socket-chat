# nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY /client-chat/build .

COPY /client-chat/nginx/docker.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
