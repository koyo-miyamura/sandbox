package config

import (
	"context"

	"github.com/sethvargo/go-envconfig"
)

type Config struct {
	Port string `env:"PORT,default=8080"`
	Env  string `env:"ENV,default=development"`
}

func MustLoadConfig() *Config {
	ctx := context.Background()
	var cfg Config

	if err := envconfig.Process(ctx, &cfg); err != nil {
		panic(err)
	}

	return &cfg
}
