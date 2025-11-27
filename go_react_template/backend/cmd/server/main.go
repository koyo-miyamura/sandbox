package main

import (
	"backend/pkg/config"
	"backend/pkg/logger"
	"log/slog"
)

func main() {
	logger := logger.New()
	slog.SetDefault(logger)

	cfg := config.MustLoadConfig()

	NewServer(cfg).Run()
}
