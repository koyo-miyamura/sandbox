package repository

import (
	"backend/internal/domain"
	"backend/internal/infra/embed"
	"context"
	"encoding/csv"
	"strings"

	"github.com/samber/lo"
)

type UserRepository struct{}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (r *UserRepository) GetAllUsers(ctx context.Context) ([]domain.User, error) {
	reader := csv.NewReader(strings.NewReader(embed.UsersCSV))
	records, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	users := lo.Map(records[1:], func(record []string, _ int) domain.User {
		return domain.User{
			ID:    record[0],
			Name:  record[1],
			Email: record[2],
		}
	})

	return users, nil
}
