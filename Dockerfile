FROM docker-registry.asiainfo.work/nginx:latest
ADD dist/ /usr/share/nginx/html/
ADD default.conf /etc/nginx/conf.d/default.conf
