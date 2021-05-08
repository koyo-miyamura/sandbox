APP_ROOT=$(abspath ./)

.PHONY: build install init enter up restart stop down logs mysql test test_system test_all

build:
	docker build -t myrailsapp .

install:
	docker run --rm -v $(APP_ROOT):/app:cached -t myrailsapp bundle install

init: build install

enter:
	docker-compose exec webapp bundle exec bash

up:
	docker-compose up -d

restart:
	docker-compose restart

stop:
	docker-compose stop

down:
	docker-compose down

logs:
	docker-compose logs -f --tail=100

mysql:
	docker-compose exec mysql mysql -uroot -proot app_dev

test:
	docker-compose exec webapp bundle exec rails test

test_system:
	docker-compose exec webapp bundle exec rails test:system

test_all: test test_system
