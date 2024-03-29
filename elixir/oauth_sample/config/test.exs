import Config

# Only in tests, remove the complexity from the password hashing algorithm
config :bcrypt_elixir, :log_rounds, 1

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :oauth_sample, OauthSample.Repo,
  username: "postgres",
  password: "postgres",
  hostname: System.get_env("DB_HOST") || "localhost",
  database: "oauth_sample_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :oauth_sample, OauthSampleWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "13Pknp9UmAcq4DEYzwpssrwF6iBxQjx2dsBe3D34OcY70gaOiCMzgM27QXQlZM2K",
  server: false

# In test we don't send emails.
config :oauth_sample, OauthSample.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# NOTE: テスト用に OauthSample.Ueberauth.Strategy.Test を作成して使用
config :ueberauth, Ueberauth,
  providers: [
    github:
      {OauthSample.Ueberauth.Strategy.Test,
       [aliased_strategy: Ueberauth.Strategy.Github, default_scope: ""]}
  ]

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
  client_id: "dummy_client_id",
  client_secret: "dummy_client_secret"
