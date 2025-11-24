package usecase

import (
	"backend/internal/domain"
)

type UserUseCase struct {
	repo domain.Repository
}

func NewUserUseCase(repo domain.Repository) *UserUseCase {
	return &UserUseCase{repo: repo}
}

func (uc *UserUseCase) GetAllUsers() ([]domain.User, error) {
	return uc.repo.GetAllUsers()
}
