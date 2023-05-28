defmodule OauthSampleWeb.PageController do
  use OauthSampleWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn |> assign(:uid, get_session(conn, :current_user)), :home, layout: false)
  end
end
