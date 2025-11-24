package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/usecase"
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
)

//go:embed all:dist
var distFS embed.FS

func main() {
	userRepo := repository.NewCSVUserRepository()
	userUseCase := usecase.NewUserUseCase(userRepo)
	userHandler := handler.NewUserHandler(userUseCase)

	mux := http.NewServeMux()
	mux.HandleFunc("/api/users", userHandler.GetUsers)

	env := os.Getenv("ENV")
	if env == "production" {
		distContent, err := fs.Sub(distFS, "dist")
		if err != nil {
			log.Fatalf("Failed to get dist subdirectory: %v", err)
		}

		fileServer := http.FileServer(http.FS(distContent))
		mux.Handle("/", fileServer)

		log.Println("Serving embedded static files")
	}

	// Wrap with CORS middleware
	handlerWithCORS := middleware.CORSMiddleware(mux)

	// Start the server
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", handlerWithCORS); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
