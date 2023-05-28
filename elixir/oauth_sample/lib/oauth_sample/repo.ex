defmodule OauthSample.Repo do
  use Ecto.Repo,
    otp_app: :oauth_sample,
    adapter: Ecto.Adapters.Postgres
end
