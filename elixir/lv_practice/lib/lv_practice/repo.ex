defmodule LvPractice.Repo do
  use Ecto.Repo,
    otp_app: :lv_practice,
    adapter: Ecto.Adapters.Postgres

  use Scrivener, page_size: 20
end
