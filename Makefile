# Setup toàn bộ hệ thống lần đầu tiên
setup:
	docker compose build
	npm install
	docker compose run --rm api composer install
	docker compose run --rm web-app npm install
# Cài đặt npm cho web-app
npm-install:
	docker compose run --rm web-app npm install
# Cài đặt composer cho api
composer-install:
	docker compose run --rm api composer install
# (Dùng khi build nhanh nhờ cache)
# Lệnh build hệ thống 
build:
	docker compose build

# Lệnh build nginx
build-nginx:
	docker compose build nginx

# Lệnh build web-app
build-web:
	docker compose build web-app

# Lệnh build api
build-api:
	docker compose build api

# ----------------------------------------------------------------
# (Dùng khi build lại từ đầu, bỏ qua cache-khi cache lỗi hoặc khi muốn đảm bảo build lại tất cả)
# Lệnh build hệ thống không cache (dùng khi muốn đảm bảo build lại tất cả từ đầu)
build-nc:
	docker compose build --no-cache
# Lệnh build nginx không cache
build-nginx-nc:
	docker compose build nginx --no-cache
# Lệnh build web-app không cache
build-web-nc:
	docker compose build web-app --no-cache

# Lệnh build api không cache
build-api-nc:
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
log:
	docker compose logs

# Lệnh xem log nginx
log-nginx:
	docker compose logs nginx

# Lệnh xem log web-app
log-web:
	docker compose logs web-app

# Lệnh xem log api
log-api:
	docker compose logs api