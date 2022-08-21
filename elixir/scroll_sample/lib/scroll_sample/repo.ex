defmodule ScrollSample.Repo do
  use Ecto.Repo,
    otp_app: :scroll_sample,
    adapter: Ecto.Adapters.Postgres

  use Scrivener, page_size: 15
end
