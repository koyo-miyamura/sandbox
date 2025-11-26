package handler

import (
	"net/http"

	"backend/internal/usecase"
)

type UserHandler struct {
	userUsecase *usecase.UserUseCase
}

func NewUserHandler(userUsecase *usecase.UserUseCase) *UserHandler {
	return &UserHandler{userUsecase: userUsecase}
}

// GetApiUsers implements ServerInterface for OpenAPI generated code
func (h *UserHandler) GetApiUsers(w http.ResponseWriter, r *http.Request) {
	domainUsers, err := h.userUsecase.GetAllUsers()
	if err != nil {
		respondErrorWithLog(w, http.StatusInternalServerError, "Failed to retrieve users", err)

		return
	}

	response := GetUsersResponse{
		Users: usersFromDomain(domainUsers),
	}

	respondJSON(w, http.StatusOK, response)
}
