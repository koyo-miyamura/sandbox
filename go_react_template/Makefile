run: setup_for_docker_user
	docker-compose up

.PHONY: setup_for_docker_user
setup_for_docker_user:
# 	cp docker_dev/compose.override.yml .
	echo "host_user_name=${USER}" > .env
	echo "host_group_name=${USER}" >> .env
	echo "host_uid=`id -u`" >> .env
	echo "host_gid=`id -g`" >> .env
