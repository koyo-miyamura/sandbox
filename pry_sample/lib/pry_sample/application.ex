defmodule PrySample.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      PrySampleWeb.Telemetry,
      PrySample.Repo,
      {DNSCluster, query: Application.get_env(:pry_sample, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: PrySample.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: PrySample.Finch},
      # Start a worker by calling: PrySample.Worker.start_link(arg)
      # {PrySample.Worker, arg},
      # Start to serve requests, typically the last entry
      PrySampleWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PrySample.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PrySampleWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
