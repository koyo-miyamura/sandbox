defmodule PrySample.Repo do
  use Ecto.Repo,
    otp_app: :pry_sample,
    adapter: Ecto.Adapters.Postgres
end
