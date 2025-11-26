# Makefile

.PHONY: build
build:
	go build -o bin/server ./cmd/server

.PHONY: run
run: build
	./bin/server

.PHONY: generate_api_code
generate_api_code:
	docker run --rm -u $(shell id -u):$(shell id -g) -v ${PWD}/openapi:/spec redocly/cli bundle ./openapi.yaml -o ./openapi.gen.yaml
	go generate ./openapi

.PHONY: test
test:
	go test ./tests/...

.PHONY: clean
clean:
	go clean
	rm -rf bin/
