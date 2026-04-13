# --- DEVELOPMENT COMMANDS ---

# Setup môi trường development
setup-local:
	npm install
	cd apps/api && composer install
	cd apps/web-app && npm install
	@-cmd /c "if not exist .env copy .env.example .env"
	@-cmd /c "if not exist apps\api\.env copy apps\api\.env.example apps\api\.env"
	@-cmd /c "if not exist apps\web-app\.env copy apps\web-app\.env.example apps\web-app\.env"
	cd apps/api && php artisan key:generate
	@echo "Setup local completed."
# Chạy lint cho toàn bộ monorepo
lint:
	npx turbo run lint
# Chạy test cho toàn bộ monorepo
test:
	npx turbo run test
# Khởi tạo database
db-init:
	cd apps/api && php artisan migrate --seed
	@echo "Database initialized."
# Reset database (Xóa sạch và tạo lại)
db-reset:
	cd apps/api && php artisan migrate:fresh --seed
	@echo "Database reset completed."

# --- DOCKER COMMANDS ---
# Thiết lập môi trường Docker
setup-docker: clean-web
	docker compose build
	@echo "Setup docker completed."
	
# Build sạch từ đầu (Không dùng cache Docker)
rebuild: clean-web
	docker compose build --no-cache


# --- RUNTIME COMMANDS ---

# Khởi động hệ thống ở chế độ background
up:
	docker compose up -d

# Dừng và xóa containers
down:
	docker compose down
# 	Dừng và xóa containers cùng với volumes (dữ liệu)
down-v:
	docker compose down -v
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
logs-short:
	docker compose logs -f --tail=100