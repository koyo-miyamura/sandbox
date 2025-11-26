.PHONY: run
run: setup
	docker-compose up

.PHONY: frontend_exec
frontend_exec:
	docker-compose exec frontend bash

.PHONY: setup
setup: setup_for_docker_user
	docker-compose run --rm frontend pnpm install

.PHONY: setup_for_docker_user
setup_for_docker_user:
	echo "host_user_name=${USER}" > .env
	echo "host_group_name=${USER}" >> .env
	echo "host_uid=`id -u`" >> .env
	echo "host_gid=`id -g`" >> .env

.PHONY: build_all
build_all:
	docker build -t go-react-app .

.PHONY: run_image
run_image:
	docker run -p 8080:8080 go-react-app
