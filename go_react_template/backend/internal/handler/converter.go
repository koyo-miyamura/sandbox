package handler

import (
	"backend/internal/domain"

	"github.com/samber/lo"
)

func usersFromDomain(domainUsers []domain.User) []User {
	return lo.Map(domainUsers, func(du domain.User, _ int) User {
		return User{
			Id:    du.ID,
			Name:  du.Name,
			Email: du.Email,
		}
	})
}
