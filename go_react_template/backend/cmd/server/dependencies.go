package main

import (
	"backend/internal/handler"
	"backend/internal/handler/middleware"
	"backend/internal/handler/router"
	"backend/internal/infra/repository"
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
