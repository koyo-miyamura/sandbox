defmodule Stack do
  @server Stack.Server

  def start_link() do
    @server.start_link(nil)
  end

  def pop() do
    GenServer.call(@server, :pop)
  end

  def push(value) do
    GenServer.cast(@server, {:push, value})
  end

  def show() do
    GenServer.call(@server, :show)
  end
end
