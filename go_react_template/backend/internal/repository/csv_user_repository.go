package repository

import (
	"backend/internal/domain"
	"encoding/csv"
	"os"
	"path/filepath"
	"runtime"
)

type CSVUserRepository struct {
	filePath string
}

func NewCSVUserRepository() *CSVUserRepository {
	// このファイルの位置を取得
	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)
	filePath := filepath.Join(dir, "data", "users.csv")
	return &CSVUserRepository{filePath: filePath}
}

func (r *CSVUserRepository) GetAllUsers() ([]domain.User, error) {
	file, err := os.Open(r.filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)
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
