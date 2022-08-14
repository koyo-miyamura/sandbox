defmodule ScrollSampleWeb.PageController do
  use ScrollSampleWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
