defmodule LvPracticeWeb.PageController do
  use LvPracticeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
