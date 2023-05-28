defmodule OauthSample.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      OauthSampleWeb.Telemetry,
      # Start the Ecto repository
      OauthSample.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: OauthSample.PubSub},
      # Start Finch
      {Finch, name: OauthSample.Finch},
      # Start the Endpoint (http/https)
      OauthSampleWeb.Endpoint
      # Start a worker by calling: OauthSample.Worker.start_link(arg)
      # {OauthSample.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: OauthSample.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    OauthSampleWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
