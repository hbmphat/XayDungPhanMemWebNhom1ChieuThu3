# Biến cấu hình
COMPOSE_FILE = infrastructure/docker-compose.yml

# Lệnh build container
build:
	docker compose -f $(COMPOSE_FILE) build --no-cache

# Lệnh khởi động hệ thống
up:
	docker compose -f $(COMPOSE_FILE) up -d

# Lệnh dừng hệ thống
down:
	docker compose -f $(COMPOSE_FILE) down

# Lệnh xem log
logs:
	docker compose -f $(COMPOSE_FILE) logs -f web-app

# Lệnh khởi động lại nhanh (Re-deploy)
deploy:
	docker compose -f $(COMPOSE_FILE) pull
	docker compose -f $(COMPOSE_FILE) up -d --build