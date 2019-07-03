start:
	docker-compose up --build -d

watch:
	docker logs marvel-server -f

down:
	docker-compose down -v
