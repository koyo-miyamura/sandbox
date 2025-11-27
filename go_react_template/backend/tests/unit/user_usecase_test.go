package unit_test

import (
	"backend/internal/infra/repository"
	"backend/internal/usecase"
	"context"
	"testing"
)

func TestGetAllUsers(t *testing.T) {
	repo := repository.NewUserRepository()
	userUsecase := usecase.NewUserUseCase(repo)

	users, err := userUsecase.GetAllUsers(context.Background())
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if len(users) == 0 {
		t.Error("Expected non-empty users")
	}
}
