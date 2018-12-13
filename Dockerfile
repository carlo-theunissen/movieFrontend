# Get latest nginx image
FROM nginx

EXPOSE 80
EXPOSE 443

COPY ./dist/livePerformance/ /var/www
# Copy nginx config file to default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 ./var/www
RUN chmod 777 ./etc/nginx/conf.d/default.conf

#run supervisord
CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/conf.d/default.conf",  "-g", "daemon off;"]
