defmodule LvPracticeWeb.Components.Paginator do
  use LvPracticeWeb, :live_component

  def render(assigns) do
    ~H"""
    <div id={@id}>
      <div>
        <p>表示件数：</p>
        <div>
          <form phx-change="update_page_size">
            <select name="page_size">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </form>
        </div>
        <p><%= @total_count %>件中 <%= @page_size * (@page - 1) + 1 %>~<%= @page_size * @page %>件を表示</p>
      </div>
      <div>
        <div phx-click="update_page" phx-value-page="1">先頭へ</div>
        <div phx-click="update_page" phx-value-page={if @page > 1, do: @page - 1, else: 1}>前へ</div>
        <div phx-click="update_page" phx-value-page={if @page < @total_pages, do: @page + 1, else: @total_pages}>次へ</div>
        <div phx-click="update_page" phx-value-page={@total_pages}>最後尾へ</div>
      </div>
    </div>
    """
  end
end
