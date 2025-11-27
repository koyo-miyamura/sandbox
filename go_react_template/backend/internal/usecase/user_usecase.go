package usecase

import (
	"backend/internal/domain"
	"context"
)

type UserUseCase struct {
	repo domain.Repository
}

func NewUserUseCase(repo domain.Repository) *UserUseCase {
	return &UserUseCase{repo: repo}
}

func (uc *UserUseCase) GetAllUsers(ctx context.Context) ([]domain.User, error) {
	return uc.repo.GetAllUsers(ctx)
}
