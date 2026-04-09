# --- SYSTEM COMMANDS ---

# Setup toàn bộ hệ thống (Chỉ chạy lần đầu, khi có thay đổi lớn hoặc hệ thống bị lỗi lớn)
# Thay đổi gồm: dockerfile, database, seeders, dependencies...
setup:
	docker compose build
	docker compose run --rm api composer install
	docker compose run --rm web-app npm install
	docker compose run --rm api php artisan migrate --seed
	@echo "Setup completed!"

# Build lại toàn bộ hệ thống (Có dọn dẹp cache Next.js)
build: clean-web
	docker compose build

# Build sạch từ đầu (Không dùng cache Docker)
rebuild: clean-web
	docker compose build --no-cache

# Dọn dẹp các thư mục rác của Next.js
clean-web:
	@echo "Cleaning Next.js build and cache..."
	@-cmd /c "if exist apps\web-app\.next rmdir /s /q apps\web-app\.next"
	@-cmd /c "if exist apps\web-app\.npm rmdir /s /q apps\web-app\.npm"
	@echo "Clean completed!"

# --- RUNTIME COMMANDS ---

# Khởi động hệ thống ở chế độ background
up:
	docker compose up -d

# Dừng và xóa containers
down:
	docker compose down

# Khởi động lại hệ thống
restart:
	docker compose restart

# --- LOGS COMMANDS ---

# Xem log tất cả các services
logs:
	docker compose logs -f

# Xem log riêng lẻ từng service
log-api:
	docker compose logs -f api

log-web:
	docker compose logs -f web-app

log-nginx:
	docker compose logs -f nginx

log-db:
	docker compose logs -f db-main

# --- HELPER COMMANDS ---

# Truy cập vào terminal của API (để chạy artisan, tinker...)
sh-api:
	docker compose exec api sh

# Truy cập vào terminal của Web-app
sh-web:
	docker compose exec web-app sh