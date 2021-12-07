defmodule LvPractice.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      LvPractice.Repo,
      # Start the Telemetry supervisor
      LvPracticeWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: LvPractice.PubSub},
      # Start the Endpoint (http/https)
      LvPracticeWeb.Endpoint
      # Start a worker by calling: LvPractice.Worker.start_link(arg)
      # {LvPractice.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: LvPractice.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LvPracticeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
