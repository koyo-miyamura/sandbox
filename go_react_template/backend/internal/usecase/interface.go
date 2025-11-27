package usecase

import (
	"backend/internal/domain"
	"context"
)

type UserUseCase interface {
	GetAllUsers(ctx context.Context) ([]domain.User, error)
}
