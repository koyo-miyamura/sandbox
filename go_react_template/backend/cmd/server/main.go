package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/usecase"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	userRepo := repository.NewCSVUserRepository()
	userUseCase := usecase.NewUserUseCase(userRepo)
	userHandler := handler.NewUserHandler(userUseCase)

	mux := http.NewServeMux()
	mux.HandleFunc("/api/users", userHandler.GetUsers)

	env := os.Getenv("ENV")
	if env == "production" {
		distPath := filepath.Join("..", "..", "dist")

		fs := http.FileServer(http.Dir(distPath))
		mux.Handle("/", fs)

		log.Println("Serving static files from", distPath)
	}

	// Wrap with CORS middleware
	handlerWithCORS := middleware.CORSMiddleware(mux)

	// Start the server
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", handlerWithCORS); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
