package usecase

import (
	"backend/internal/domain"
	"context"
)

type userUseCase struct {
	repo domain.Repository
}

func NewUserUseCase(repo domain.Repository) UserUseCase {
	return &userUseCase{repo: repo}
}

func (uc *userUseCase) GetAllUsers(ctx context.Context) ([]domain.User, error) {
	return uc.repo.GetAllUsers(ctx)
}
