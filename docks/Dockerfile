
FROM nginx:1.17.9

LABEL maintainer="Paulo Francesco Pacheco <pfpacheco@gmail.com>"

RUN rm /etc/nginx/nginx.conf

RUN mkdir -p /var/www \
    && mkdir -p /var/www/html

COPY ./nginx/html /var/www/html

ADD ./nginx/conf/nginx.conf /etc/nginx/