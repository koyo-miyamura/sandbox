defmodule LvSampleWeb.QiitaSearchRealtime do
  use Phoenix.LiveView

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
