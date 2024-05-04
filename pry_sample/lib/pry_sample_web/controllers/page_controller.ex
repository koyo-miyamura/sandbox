defmodule PrySampleWeb.PageController do
  use PrySampleWeb, :controller

  def home(conn, _params) do
    require IEx
    IEx.pry()
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end
end
