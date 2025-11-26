package handler

import (
	"encoding/json"
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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := GetUsersResponse{
		Users: usersFromDomain(domainUsers),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
