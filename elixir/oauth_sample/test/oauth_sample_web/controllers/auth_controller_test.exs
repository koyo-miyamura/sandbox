defmodule OauthSampleWeb.AuthControllerTest do
  use OauthSampleWeb.ConnCase

  test "GET /auth/github", %{conn: conn} do
    conn = get(conn, ~p"/auth/github")

    assert %URI{
             path: "/login/oauth/authorize",
             query: query
           } = redirected_to(conn) |> URI.parse()

    assert %{
             "client_id" => "dummy_client_id",
             "redirect_uri" => "http://www.example.com/auth/github/callback",
             "response_type" => "code",
             "scope" => "",
             "state" => state
           } = URI.decode_query(query)

    assert is_binary(state)
  end

  defp setup_for_github_auth(%{conn: conn}) do
    # NOTE: state パラメータ付きでリクエストしないと CSRF エラーになるので事前に生成しておく
    conn =
      conn
      |> get(~p"/auth/github")

    state =
      redirected_to(conn)
      |> URI.parse()
      |> Map.get(:query)
      |> URI.decode_query()
      |> Map.get("state")

    %{conn: conn |> recycle(), state: state, provider: :github}
  end

  describe "GET /auth/:provider/callback when provider is google" do
    setup [:setup_for_github_auth]

    test "redirects with error message when OAuth is failure", %{
      conn: conn,
      state: state,
      provider: provider
    } do
      ueberauth_failure = %Ueberauth.Failure{
        errors: %Ueberauth.Failure.Error{
          message: "error message",
          message_key: "error message_key"
        },
        provider: provider,
        strategy: Ueberauth.Strategy.Github
      }

      conn =
        conn
        |> assign(:ueberauth_failure, ueberauth_failure)
        |> get(~p"/auth/github/callback", %{"state" => state})

      assert redirected_to(conn) == ~p"/"
      assert Phoenix.Flash.get(conn.assigns.flash, :error) == "Failed to authenticate."
    end

    test "redirects and generate session when OAuth is success",
         %{
           conn: conn,
           state: state,
           provider: provider
         } do
      identifier = "1"

      ueberauth_auth = %Ueberauth.Auth{
        provider: provider,
        uid: identifier
      }

      conn =
        conn
        |> assign(:ueberauth_auth, ueberauth_auth)
        |> get(~p"/auth/google/callback", %{"state" => state})

      assert Phoenix.Flash.get(conn.assigns.flash, :info) == "Succeed to authenticate!"

      assert redirected_to(conn) == ~p"/"
      assert get_session(conn, :current_user) == identifier
    end
  end
end
