package handler

import (
	"encoding/json"
	"net/http"
)

// respondJSON writes a JSON response with the given status code and data
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
