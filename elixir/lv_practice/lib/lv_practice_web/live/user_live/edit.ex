defmodule LvPracticeWeb.UserLive.Edit do
  use LvPracticeWeb, :live_view

  alias LvPractice.Users

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    {:ok, socket |> assign(:page_title, "Edit User") |> assign(:user, Users.get_user!(id))}
  end
end
