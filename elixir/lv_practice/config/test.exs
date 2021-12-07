import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :lv_practice, LvPractice.Repo,
  username: "postgres",
  password: "postgres",
  database: "lv_practice_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :lv_practice, LvPracticeWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "+EEMh2+z788I7WAxkzyvkknq6PVUXXuVvWi8ytVcCfyHhcw1lTojE5+TSIBmjiet",
  server: false

# In test we don't send emails.
config :lv_practice, LvPractice.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
