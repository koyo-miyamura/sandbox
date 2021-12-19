defmodule LvPracticeWeb.UserLive.Index do
  use LvPracticeWeb, :live_view

  alias LvPractice.Users

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"page" => page, "page_size" => page_size}, _, socket) do
    page = if page <= 0, do: 1, else: page
    page_size = if page_size <= 0, do: 1, else: page_size

    {:noreply,
     socket
     |> assign(assigns_by_page(page, page_size))}
  end

  @impl true
  def handle_params(_, _, socket) do
    {:noreply, assign(socket, assigns_by_page(1, 5))}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    user = Users.get_user!(id)
    {:ok, _} = Users.delete_user(user)

    %{
      page: page,
      page_size: page_size
    } = socket.assigns

    {:noreply,
     push_patch(socket,
       to:
         Routes.live_path(socket, __MODULE__, %{
           "page" => page,
           "page_size" => page_size
         })
     )}
  end

  def handle_event("update_page_size", %{"page_size" => page_size}, socket) do
    %{page: page} = socket.assigns
    page_size = if page_size <= 0, do: 1, else: page_size

    {:noreply,
     push_patch(socket,
       to:
         Routes.live_path(socket, __MODULE__, %{
           "page" => page,
           "page_size" => page_size
         })
     )}
  end

  def handle_event("update_page", %{"page" => page}, socket) do
    %{page_size: page_size} = socket.assigns
    page = if page <= 0, do: 1, else: page

    {:noreply,
     push_patch(socket,
       to: Routes.live_path(socket, __MODULE__, page: page, page_size: page_size)
     )}
  end

  defp assigns_by_page(page, page_size) do
    %{
      entries: entries,
      page_number: page_number,
      page_size: page_size,
      total_entries: total_entries,
      total_pages: total_pages
    } = Users.paginate_users(page: page, page_size: page_size)

    [
      users: entries,
      page: page_number,
      page_size: page_size,
      total_entries: total_entries,
      total_pages: total_pages
    ]
  end
end
