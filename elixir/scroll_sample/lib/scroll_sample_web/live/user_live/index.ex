defmodule ScrollSampleWeb.UserLive.Index do
  use ScrollSampleWeb, :live_view

  alias ScrollSample.Users
  alias ScrollSample.Users.User

  @default_page 1
  @per_page 15

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:page, @default_page)
     |> assign(:total_pages, total_pages())
     |> assign(:users, list_users(@default_page, @per_page))}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit User")
    |> assign(:user, Users.get_user!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New User")
    |> assign(:user, %User{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Users")
    |> assign(:user, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    user = Users.get_user!(id)
    {:ok, _} = Users.delete_user(user)

    {:noreply, assign(socket, :users, list_users(@default_page, @per_page))}
  end

  @impl true
  def handle_event("load-more", _, %{assigns: assigns} = socket) do
    {:noreply,
     socket
     |> assign(:page, assigns.page + 1)
     |> assign(:users, list_users(assigns.page + 1, @per_page))}
  end

  defp list_users(page, per_page) do
    Users.list_users(page, per_page).entries
  end

  defp total_pages do
    Users.list_users(@default_page, @per_page).total_pages
  end
end
