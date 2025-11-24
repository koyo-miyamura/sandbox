package repository

import (
	"backend/internal/domain"
	_ "embed"
	"encoding/csv"
	"strings"
)

//go:embed data/users.csv
var usersCSV string

type CSVUserRepository struct{}

func NewCSVUserRepository() *CSVUserRepository {
	return &CSVUserRepository{}
}

func (r *CSVUserRepository) GetAllUsers() ([]domain.User, error) {
	reader := csv.NewReader(strings.NewReader(usersCSV))
	records, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	var users []domain.User
	for _, record := range records[1:] { // Skip header
		user := domain.User{
			ID:    record[0],
			Name:  record[1],
			Email: record[2],
		}
		users = append(users, user)
	}

	return users, nil
}
