defmodule LvPracticeWeb.UserLive.New do
  use LvPracticeWeb, :live_view

  alias LvPractice.Users.User

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket |> assign(:page_title, "New User") |> assign(:user, %User{})}
  end
end
