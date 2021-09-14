# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :auth_sample,
  ecto_repos: [AuthSample.Repo]

# Configures the endpoint
config :auth_sample, AuthSampleWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "REKybb2SMZU4qqUOaoh99dbYchq0TS6x4XYHk15sbQqMXsnq/Rdb/TTuTqSyTOhW",
  render_errors: [view: AuthSampleWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: AuthSample.PubSub,
  live_view: [signing_salt: "MaNfWfYP"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
