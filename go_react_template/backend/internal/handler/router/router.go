package router

import (
	"backend/internal/handler"
	"backend/pkg/config"
	"log/slog"
	"net/http"
)

type Handlers struct {
	UserHandler    *handler.UserHandler
	FileHandler    *handler.FileHandler
	SwaggerHandler *handler.SwaggerHandler
}

func SetupRoutes(cfg *config.Config, handlers *Handlers) http.Handler {
	mux := http.NewServeMux()

	// Register OpenAPI generated routes
	handler.HandlerWithOptions(handlers.UserHandler, handler.StdHTTPServerOptions{
		BaseRouter: mux,
	})

	switch cfg.Env {
	case "development":
		setupDevelopmentRoutes(mux, handlers)
	case "production":
		setupProductionRoutes(mux, handlers)
	}

	return mux
}

func setupDevelopmentRoutes(mux *http.ServeMux, handers *Handlers) {
	mux.HandleFunc("/api/docs", handers.SwaggerHandler.GetApiDoc)
	mux.HandleFunc("/api/openapi.json", handers.SwaggerHandler.GetOpenapiJson)

	slog.Info("Serving api/docs for development")
}

func setupProductionRoutes(mux *http.ServeMux, handlers *Handlers) {
	mux.HandleFunc("/", handlers.FileHandler.ServeContent)

	slog.Info("Serving embedded static files with SPA fallback")
}
