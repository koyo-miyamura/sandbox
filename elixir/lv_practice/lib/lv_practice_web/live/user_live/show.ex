defmodule LvPracticeWeb.UserLive.Show do
  use LvPracticeWeb, :live_view

  alias LvPractice.Users

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    {:noreply,
     socket
     |> assign(:page_title, "Show User")
     |> assign(:user, Users.get_user!(id))}
  end
end
