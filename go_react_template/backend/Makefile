# Makefile

.PHONY: build
build:
	go build -o bin/server ./cmd/server

.PHONY: run
run: build
	./bin/server

.PHONY: test
test:
	go test ./tests/...

.PHONY: clean
clean:
	go clean
	rm -rf bin/
