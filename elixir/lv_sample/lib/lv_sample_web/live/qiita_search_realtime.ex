defmodule LvSampleWeb.QiitaSearchRealtime do
  use Phoenix.LiveView

  def render(assigns) do
    ~L"""
        <p>
        <%= if @message do %><%= @message %><% end %>
        </p>

        <form phx-change="change">
        <input type="text" name="query" value="<%= @query %>" placeholder="empty" />
        Query: <%= @query %><br>
        </form>

        <table>
        <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>作成日</th>
        </tr>
        <%= for result <- @results do %>
        <tr>
            <td><%= result[ "id" ] %></td>
            <td><%= result[ "title" ] %></td>
            <td><%= result[ "created_at" ] %></td>
        </tr>
        <% end %>
        </table>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, assign(socket, query: "", message: "[Init]", results: [])}
  end

  def handle_event("change", %{"query" => query}, socket) do
    send(self(), {:submit, query})
    {:noreply, assign(socket, message: "[Searching...]", query: query)}
  end

  def handle_info({:submit, query}, socket) do
    results = Json.get("https://qiita.com", "/api/v2/items?query=#{query}")
    {:noreply, assign(socket, message: "[Complete!!]", results: results)}
  end
end
