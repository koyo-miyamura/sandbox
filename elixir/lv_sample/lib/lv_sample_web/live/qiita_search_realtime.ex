defmodule LvSampleWeb.QiitaSearchRealtime do
  use Phoenix.LiveView

  def render(assigns) do
    ~L"""
        <p>
        <%= if @message do %><%= @message %><% end %>
        </p>

        <form phx-submit="submit" phx-change="change">
        <input type="text" name="query" value="<%= @query %>" placeholder="empty" <%= if @loading, do: "readonly" %> />
        Query: <%= @query %><br>
        <input type="submit" value="search" onclick="blur()" <%= if @loading, do: "readonly" %> />
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
    {:ok, assign(socket, query: "", message: "[Init]", loading: false, results: [])}
  end

  def handle_event("change", %{"query" => query}, socket) do
    {:noreply, assign(socket, query: query, message: "")}
  end

  def handle_event("submit", %{"query" => query}, socket) do
    send(self(), {:submit, query})
    {:noreply, assign(socket, query: query, message: "[Searching...]", loading: true)}
  end

  def handle_info({:submit, query}, socket) do
    results = Json.get("https://qiita.com", "/api/v2/items?query=#{query}")

    {:noreply,
     assign(socket, query: query, message: "[Complete!!]", loading: false, results: results)}
  end
end
