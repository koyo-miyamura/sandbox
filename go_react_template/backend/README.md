# Project Title

## Overview
This project implements a RESTful API server using Go, adhering to clean architecture principles. The API provides user information and is designed to be extensible and maintainable.

## Project Structure
```
backend
├── cmd
│   └── server
│       └── main.go
├── internal
│   ├── domain
│   │   ├── user.go
│   │   └── repository.go
│   ├── usecase
│   │   └── user_usecase.go
│   ├── repository
│   │   └── csv_user_repository.go
│   ├── handler
│   │   └── user_handler.go
│   └── middleware
│       └── cors.go
├── pkg
│   └── config
│       └── config.go
├── api
│   ├── openapi.yaml
│   └── generated
│       └── api.go
├── data
│   └── users.csv
├── tests
│   ├── integration
│   │   └── user_api_test.go
│   └── unit
│       └── user_usecase_test.go
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```
   go mod tidy
   ```

3. **Run the server:**
   ```
   go run cmd/server/main.go
   ```

4. **Access the API:**
   The API will be available at `http://localhost:8080/api/users`.

## API Endpoints
- **GET /api/users**
  - Returns a JSON array of user information, including ID, Name, and Email.

## Testing
- **Unit Tests:** Run unit tests using:
  ```
  go test ./tests/unit
  ```

- **Integration Tests:** Run integration tests using:
  ```
  go test ./tests/integration
  ```

## License
This project is licensed under the MIT License. See the LICENSE file for details.