.PHONY: run
run:
	docker compose up

.PHONY: frontend_exec
frontend_exec:
	docker compose exec frontend bash

.PHONY: setup_without_user
setup_without_user: setup_frontend

.PHONY: setup_with_user
setup_with_user: setup_frontend
	cp docker_dev/docker-compose.override.yml .
	echo "host_user_name=${USER}" > .env
	echo "host_group_name=${USER}" >> .env
	echo "host_uid=`id -u`" >> .env
	echo "host_gid=`id -g`" >> .env

.PHONY: setup_frontend
setup_frontend:
	docker compose run --rm frontend pnpm install

.PHONY: generate_api_code
generate_api_code:
	docker run --rm -u $(shell id -u):$(shell id -g) -v ${PWD}/openapi:/spec redocly/cli bundle ./openapi.yaml -o ./openapi.gen.yaml
	docker compose run --rm backend go generate ./openapi
	docker compose run --rm frontend pnpm run gen:openapi

.PHONY: build_all
build_all:
	docker build -t go-react-app .

.PHONY: run_image
run_image:
	docker run -p 8080:8080 go-react-app
