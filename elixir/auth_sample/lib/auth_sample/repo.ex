defmodule AuthSample.Repo do
  use Ecto.Repo,
    otp_app: :auth_sample,
    adapter: Ecto.Adapters.Postgres
end
