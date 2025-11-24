package generated

import (
	"backend/internal/usecase"
	"encoding/json"
	"net/http"
)

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type UserHandler struct {
	UserUsecase *usecase.UserUseCase
}

func (h *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.UserUsecase.GetAllUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func RegisterRoutes(mux *http.ServeMux, userUsecase *usecase.UserUseCase) {
	handler := &UserHandler{UserUsecase: userUsecase}
	mux.HandleFunc("/api/users", handler.GetUsers)
}
