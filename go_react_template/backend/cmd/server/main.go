package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/router"
	"backend/internal/usecase"
	"backend/pkg/config"
	"backend/pkg/logger"
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	logger := logger.New()
	slog.SetDefault(logger)

	cfg, err := config.LoadConfig()
	if err != nil {
		slog.Error("Failed to load config", "error", err)
		os.Exit(1)
	}

	server := setupServer(cfg)

	runServer(server, cfg)
}

func setupServer(cfg *config.Config) *http.Server {
	userRepo := repository.NewUserRepository()
	userUseCase := usecase.NewUserUseCase(userRepo)
	userHandler := handler.NewUserHandler(userUseCase)

	fileHandler := handler.NewFileHandler()
	swaggerHandler := handler.NewSwaggerHandler()

	mux := router.SetupRoutes(cfg, &router.Handlers{
		UserHandler:    userHandler,
		FileHandler:    fileHandler,
		SwaggerHandler: swaggerHandler,
	})

	handler := middleware.CORSMiddleware(mux)

	return &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: handler,
	}
}

func runServer(server *http.Server, cfg *config.Config) {
	go func() {
		slog.Info("Starting server", "port", cfg.Port, "env", cfg.Env)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("Could not start server", "error", err)
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	sig := <-quit
	slog.Info("Received shutdown signal", "signal", sig)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	slog.InfoContext(ctx, "Shutting down server...")
	if err := server.Shutdown(ctx); err != nil {
		slog.Error("Server forced to shutdown", "error", err)
		os.Exit(1)
	}

	slog.InfoContext(ctx, "Server exited gracefully")
}
