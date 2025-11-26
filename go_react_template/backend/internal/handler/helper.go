package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func respondErrorWithLog(w http.ResponseWriter, status int, message string, err error) {
	slog.Error(message, "error", err)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(ErrorResponse{
		Error: message,
	})
}
