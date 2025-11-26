package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/router"
	"backend/internal/usecase"
	"backend/pkg/config"
	"backend/pkg/logger"
	"log/slog"
	"net/http"
	"os"
)

func main() {
	logger := logger.New()
	slog.SetDefault(logger)

	cfg, err := config.LoadConfig()
	if err != nil {
		slog.Error("Failed to load config", "error", err)
		os.Exit(1)
	}

	handler := setupHandler()

	slog.Info("Starting server", "port", cfg.Port, "env", cfg.Env)
	if err := http.ListenAndServe(":"+cfg.Port, handler); err != nil {
		slog.Error("Could not start server", "error", err)
		os.Exit(1)
	}
}

func setupHandler() http.Handler {
	userRepo := repository.NewUserRepository()
	userUseCase := usecase.NewUserUseCase(userRepo)
	userHandler := handler.NewUserHandler(userUseCase)
	mux := router.SetupRoutes(&router.Handlers{
		UserHandler: userHandler,
	})

	return middleware.CORSMiddleware(mux)
}
