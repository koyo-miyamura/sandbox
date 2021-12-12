defmodule LvPracticeWeb.UserLive.Index do
  use LvPracticeWeb, :live_view

  alias LvPractice.Users
  alias LvPractice.Users.User

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :users, list_users())}
  end

  @impl true
  def handle_params(_params, _url, socket) do
    # {:noreply, apply_action(socket, socket.assigns.live_action, params)}
    {:noreply,
     socket
     |> assign(:page_title, "Listing Users")
     |> assign(:user, nil)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    user = Users.get_user!(id)
    {:ok, _} = Users.delete_user(user)

    {:noreply, assign(socket, :users, list_users())}
  end

  defp list_users do
    Users.list_users()
  end
end
