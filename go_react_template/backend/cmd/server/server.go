package main

import (
	"backend/pkg/config"
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

type Server struct {
	server *http.Server
	cfg    *config.Config
}

func NewServer(cfg *config.Config) *Server {
	return &Server{
		server: &http.Server{
			Addr:    ":" + cfg.Port,
			Handler: setupHandler(cfg),
		},
		cfg: cfg,
	}
}

func (s *Server) Run() {
	serverErr := make(chan error, 1)

	go func() {
		slog.Info("Starting server", "port", s.cfg.Port, "env", s.cfg.Env)
		serverErr <- s.server.ListenAndServe()
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-serverErr:
		if err != nil && err != http.ErrServerClosed {
			slog.Error("Server error", "error", err)
			os.Exit(1)
		}
	case sig := <-quit:
		slog.Info("Received shutdown signal", "signal", sig)
	}

	s.shutdown()
}

func (s *Server) shutdown() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	slog.InfoContext(ctx, "Shutting down server...")

	if err := s.server.Shutdown(ctx); err != nil {
		slog.Error("Server shutdown failed", "error", err)
		os.Exit(1)
	}

	slog.InfoContext(ctx, "Server exited gracefully")
}
