# (Dùng khi build nhanh nhờ cache)
# Lệnh build hệ thống 
build:
	docker compose build

# Lệnh build nginx
build-nginx:
	docker compose build nginx

# Lệnh build web-app
build-web-app:
	docker compose build web-app

# Lệnh build api
build-api:
	docker compose build api

# ----------------------------------------------------------------
# (Dùng khi build lại từ đầu, bỏ qua cache-khi cache lỗi hoặc khi muốn đảm bảo build lại tất cả)
# Lệnh build hệ thống không cache (dùng khi muốn đảm bảo build lại tất cả từ đầu)
build-no-cache:
	docker compose build --no-cache
# Lệnh build nginx không cache
build-nginx-no-cache:
	docker compose build nginx --no-cache
# Lệnh build web-app không cache
build-web-app-no-cache:
	docker compose build web-app --no-cache

# Lệnh build api không cache
build-api-no-cache:
	docker compose build api --no-cache

# ----------------------------------------------------------------

# Lệnh khởi động hệ thống
up:
	docker compose up -d

# Lệnh dừng hệ thống
down:
	docker compose down

# -----------------------------------------------------------------

# Lệnh xem log hệ thống
logs:
	docker compose logs

# Lệnh xem log nginx
logs-nginx:
	docker compose logs nginx

# Lệnh xem log web-app
logs-web-app:
	docker compose logs web-app

# Lệnh xem log api
logs-api:
	docker compose logs api