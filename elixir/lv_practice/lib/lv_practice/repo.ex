defmodule LvPractice.Repo do
  use Ecto.Repo,
    otp_app: :lv_practice,
    adapter: Ecto.Adapters.Postgres
end
