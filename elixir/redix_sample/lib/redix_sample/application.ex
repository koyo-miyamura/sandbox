defmodule RedixSample.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # 追加
      {Redix, host: "localhost", port: 6379, name: :redix}
    ]

    opts = [strategy: :one_for_one, name: RedixSample.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
