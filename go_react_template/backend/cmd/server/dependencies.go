package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/router"
	"backend/internal/usecase"
	"backend/pkg/config"
	"net/http"
)

func setupHandler(cfg *config.Config) http.Handler {
	userRepo := repository.NewUserRepository()
	userUseCase := usecase.NewUserUseCase(userRepo)
	userHandler := handler.NewUserHandler(userUseCase)

	fileHandler := handler.NewFileHandler()

	swaggerHandler := handler.NewSwaggerHandler()

	mux := router.SetupRoutes(cfg, &router.Handlers{
		UserHandler:    userHandler,
		FileHandler:    fileHandler,
		SwaggerHandler: swaggerHandler,
	})

	return middleware.CORSMiddleware(mux)
}
