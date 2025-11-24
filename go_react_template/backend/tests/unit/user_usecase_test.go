package unit_test

import (
	"backend/internal/repository"
	"backend/internal/usecase"
	"testing"
)

func TestGetAllUsers(t *testing.T) {
	repo := repository.NewCSVUserRepository()
	userUsecase := usecase.NewUserUseCase(repo)

	users, err := userUsecase.GetAllUsers()
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if len(users) == 0 {
		t.Error("Expected non-empty users")
	}
}
