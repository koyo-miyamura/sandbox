defmodule LvPracticeWeb.Components.Table do
  use Phoenix.Component

  def table(assigns) do
    ~H"""
    <table>
      <%= render_block(@inner_block) %>
    </table>
    """
  end

  def table_header(assigns) do
    ~H"""
    <thead>
      <tr>
        <%= render_block(@inner_block) %>
      </tr>
    </thead>
    """
  end

  def table_body(assigns) do
    ~H"""
    <thead>
      <tbody>
        <%= for user <- @users do %>
          <%= render_block(@inner_block, user) %>
        <% end %>
      </tbody>
    </thead>
    """
  end
end
