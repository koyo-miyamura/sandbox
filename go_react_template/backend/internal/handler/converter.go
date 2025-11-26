package handler

import (
	"backend/internal/domain"

	"github.com/samber/lo"
)

func userFromDomain(du domain.User) User {
	return User{
		Id:    du.ID,
		Name:  du.Name,
		Email: du.Email,
	}
}

func usersFromDomain(domainUsers []domain.User) []User {
	return lo.Map(domainUsers, func(du domain.User, _ int) User {
		return userFromDomain(du)
	})
}
