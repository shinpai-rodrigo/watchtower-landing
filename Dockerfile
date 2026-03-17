# WatchTower.ai — Static site served by nginx
FROM nginx:alpine

# Copy static files
COPY index.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Custom nginx config
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  index index.html;\n  charset utf-8;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n  gzip on;\n  gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
