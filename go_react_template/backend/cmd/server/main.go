package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/usecase"
	"log"
	"net/http"
)

func main() {
	// Initialize repository
	userRepo := repository.NewCSVUserRepository()

	// Initialize use case
	userUseCase := usecase.NewUserUseCase(userRepo)

	// Initialize handler
	userHandler := handler.NewUserHandler(userUseCase)

	// Setup routes
	mux := http.NewServeMux()
	mux.HandleFunc("/api/users", userHandler.GetUsers)

	// Wrap with CORS middleware
	handler := middleware.CORSMiddleware(mux)

	// Start the server
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
