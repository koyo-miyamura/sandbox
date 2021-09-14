defmodule AuthSampleWeb.PageController do
  use AuthSampleWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
