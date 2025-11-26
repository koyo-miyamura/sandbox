package router

import (
	"backend/internal/embed"
	"backend/internal/handler"
	"backend/pkg/config"
	"io/fs"
	"log/slog"
	"net/http"
)

type Handlers struct {
	UserHandler *handler.UserHandler
}

func SetupRoutes(handlers *Handlers) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/users", handlers.UserHandler.GetUsers)

	config, err := config.LoadConfig()
	if err != nil {
		slog.Error("Failed to load config", "error", err)
		return mux
	}

	switch config.Env {
	case "development":
		setupDevelopmentRoutes(mux)
	case "production":
		setupProductionRoutes(mux)
	}

	return mux
}

func setupDevelopmentRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/docs", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Write(embed.SwaggerUIHTML)
	})

	mux.HandleFunc("/api/openapi.json", func(w http.ResponseWriter, r *http.Request) {
		spec, err := handler.GetSwagger()
		if err != nil {
			slog.Error("Failed to get OpenAPI spec", "error", err)
			http.Error(w, "Failed to load API specification", http.StatusInternalServerError)
			return
		}

		yamlBytes, err := spec.MarshalJSON()
		if err != nil {
			slog.Error("Failed to marshal OpenAPI spec", "error", err)
			http.Error(w, "Failed to serialize API specification", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(yamlBytes)
	})

	slog.Info("Swagger UI available at /api/docs")
}

func setupProductionRoutes(mux *http.ServeMux) {
	distContent, err := fs.Sub(embed.DistFS, "dist")
	if err != nil {
		slog.Error("Failed to get dist subdirectory", "error", err)
		return
	}

	fileServer := http.FileServer(http.FS(distContent))
	mux.Handle("/", fileServer)

	slog.Info("Serving embedded static files")
}
