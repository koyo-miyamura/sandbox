package handler

import (
	"backend/internal/infra/embed"
	"io/fs"
	"log/slog"
	"net/http"
	"strings"
)

type FileHandler struct{}

func NewFileHandler() *FileHandler {
	return &FileHandler{}
}

func (f *FileHandler) ServeContent(w http.ResponseWriter, r *http.Request) {
	distContent, err := fs.Sub(embed.DistFS, "dist")
	if err != nil {
		slog.Error("Failed to get dist subdirectory", "error", err)
		return
	}

	path := strings.TrimPrefix(r.URL.Path, "/")
	if path == "" {
		path = "index.html"
	}

	// NOTE: Redirect when reload without `/` path.
	_, err = fs.Stat(distContent, path)
	if err != nil {
		indexData, err := fs.ReadFile(distContent, "index.html")
		if err != nil {
			respondErrorWithLog(w, http.StatusNotFound, "Not Found", err)
			return
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write(indexData)
		return
	}

	fileServer := http.FileServer(http.FS(distContent))
	fileServer.ServeHTTP(w, r)
}
