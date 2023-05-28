defmodule OauthSampleWeb.AuthController do
  @moduledoc """
  Auth controller responsible for handling Ueberauth responses
  """

  use OauthSampleWeb, :controller

  alias Ueberauth.Strategy.Helpers

  def request(conn, _params) do
    redirect(conn, to: Helpers.request_url(conn))
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> clear_session()
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_failure: fails}} = conn, _params) do
    IO.inspect(fails)

    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    IO.inspect(auth)

    conn
    |> put_flash(:info, "Succeed to authenticate!")
    |> put_session(:current_user, auth.uid)
    |> configure_session(renew: true)
    |> redirect(to: "/")
  end
end
