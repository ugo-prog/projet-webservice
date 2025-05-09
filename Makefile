# Makefile (root of repo)

# ————— Variables —————
PROJECT_NAME      := esme_app
DOCKER_COMPOSE    := docker-compose -f docker-compose.yaml
APP_CONTAINER     := esme_backend

.PHONY: docker-build docker-up docker-down docker-clean \
        db-init db-migrate db-upgrade db-reset help

# 🐳 Build & start all services
docker-build:
	@echo "🐳 Building & starting containers..."
	$(DOCKER_COMPOSE) up --build -d

# 📦 Start (without build)
docker-up:
	@echo "📦 Starting containers..."
	$(DOCKER_COMPOSE) up -d

# 🛑 Stop & remove
docker-down:
	@echo "🛑 Stopping & removing containers..."
	$(DOCKER_COMPOSE) down

# 🧹 Clean unused Docker objects
docker-clean:
	@echo "🧹 Pruning Docker system..."
	docker system prune -af

# 🛢 DB: initialize migrations
db-init:
	@echo "📊 Initializing DB migrations..."
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) flask db init

# 📈 Create a migration
db-migrate:
	@echo "📈 Generating a new migration..."
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) flask db migrate

# ⬆️ Apply migrations
db-upgrade:
	@echo "⬆️ Applying DB migrations..."
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) flask db upgrade

# ♻️ Full reset of migrations
db-reset:
	@echo "♻️ Resetting the database..."
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) bash -c "\
		rm -rf migrations && \
		flask db init && \
		flask db migrate && \
		flask db upgrade\
	"

# ❓ Help
help:
	@echo "Available commands:"
	@echo "  make docker-build   Build & start all services"
	@echo "  make docker-up      Start services"
	@echo "  make docker-down    Stop & remove services"
	@echo "  make docker-clean   Prune unused Docker resources"
	@echo "  make db-init        Initialize DB migrations"
	@echo "  make db-migrate     Generate a new migration"
	@echo "  make db-upgrade     Apply migrations"
	@echo "  make db-reset       Reset DB migrations"
