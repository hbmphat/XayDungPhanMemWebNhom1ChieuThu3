# Sử dụng base image là Nginx Alpine
FROM nginx:alpine

# Xóa file cấu hình mặc định
RUN rm /etc/nginx/conf.d/default.conf

# Copy file cấu hình tổng
COPY infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy file template
COPY infrastructure/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template

# Cài đặt entrypoint để xử lý biến môi trường khi container khởi động
ENTRYPOINT ["/bin/sh", "-c", "envsubst '${APP_URL} ${API_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]