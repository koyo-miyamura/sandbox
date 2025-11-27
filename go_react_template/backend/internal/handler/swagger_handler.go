package handler

import (
	"backend/internal/infra/embed"
	"log/slog"
	"net/http"
)

type SwaggerHandler struct{}

func NewSwaggerHandler() *SwaggerHandler {
	return &SwaggerHandler{}
}

func (f *SwaggerHandler) GetApiDoc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Write(embed.SwaggerUIHTML)
}

func (f *SwaggerHandler) GetOpenapiJson(w http.ResponseWriter, r *http.Request) {
	spec, err := GetSwagger()
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

	slog.Info("Swagger UI available at /api/docs")
}
