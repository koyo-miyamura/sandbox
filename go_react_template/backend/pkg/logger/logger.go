package logger

import (
	"log/slog"
	"os"
)

// New creates and returns a configured slog.Logger
func New() *slog.Logger {
	opts := &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}

	handler := slog.NewJSONHandler(os.Stdout, opts)

	return slog.New(handler)
}
