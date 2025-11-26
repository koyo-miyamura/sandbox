package embed

import "embed"

//go:embed all:dist
var DistFS embed.FS

//go:embed data/users.csv
var UsersCSV string

//go:embed swagger/swagger-ui.html
var SwaggerUIHTML []byte
