package middleware

import (
	"log/slog"
	"net/http"
)

func BasicAuth(username, password string, next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		requestedUsername, requestedPassword, ok := r.BasicAuth()
		if !ok {
			unauthorized(w)
			return
		}

		if requestedUsername != username || requestedPassword != password {
			slog.Warn("Basic auth failed", "username", requestedUsername, "remote_addr", r.RemoteAddr)
			unauthorized(w)
			return
		}

		next.ServeHTTP(w, r)
	}
}

func unauthorized(w http.ResponseWriter) {
	w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
	http.Error(w, "Unauthorized", http.StatusUnauthorized)
}
