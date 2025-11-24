package domain

// Repository defines the methods for accessing user data.
type Repository interface {
	GetAllUsers() ([]User, error)
}
