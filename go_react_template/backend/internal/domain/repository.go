package domain

import "context"

// Repository defines the methods for accessing user data.
type Repository interface {
	GetAllUsers(ctx context.Context) ([]User, error)
}
