# Sử dụng base image là Nginx Alpine
FROM nginx:alpine

# Xóa file cấu hình mặc định của Nginx để không bị xung đột
RUN rm /etc/nginx/conf.d/default.conf

# Copy các file cấu hình vào image
COPY infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
COPY infrastructure/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf.template

# Cài đặt entrypoint để xử lý biến môi trường khi container khởi động
# Chuyển đổi file cấu hình từ template và khởi động Nginx
# Chỉ thay thế các biến có tiền tố $, ví dụ ${VAR}
ENTRYPOINT ["/bin/sh", "-c", "envsubst '${APP_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]