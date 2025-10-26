.PHONY: run
run: setup
	docker-compose up

.PHONY: setup
setup: setup_for_docker_user
	docker-compose run --rm frontend pnpm install

.PHONY: setup_for_docker_user
setup_for_docker_user:
	echo "host_user_name=${USER}" > .env
	echo "host_group_name=${USER}" >> .env
	echo "host_uid=`id -u`" >> .env
	echo "host_gid=`id -g`" >> .env

