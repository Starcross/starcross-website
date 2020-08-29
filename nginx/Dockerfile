FROM staticfloat/nginx-certbot:latest

RUN rm -rf /etc/nginx/user.conf.d/*
COPY conf.d/ /etc/nginx/user.conf.d/
