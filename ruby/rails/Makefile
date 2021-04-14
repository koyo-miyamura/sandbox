APP_ROOT=$(abspath ./)

build:
	docker build -t myrailsapp .

init: build
	docker run --rm -v $(APP_ROOT):/app:cached -t myrailsapp bundle install

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
