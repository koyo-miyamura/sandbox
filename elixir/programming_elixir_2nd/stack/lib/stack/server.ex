defmodule Stack.Server do
  use GenServer

  def start_link(init_stack) do
    GenServer.start_link(__MODULE__, init_stack, name: __MODULE__)
  end

  def pop() do
    GenServer.call(__MODULE__, :pop)
  end

  def push(value) do
    GenServer.cast(__MODULE__, {:push, value})
  end

  def init(stack) do
    {:ok, stack}
  end

  def handle_call(:pop, _from, state) do
    [value | new_state] = state
    {:reply, value, new_state}
  end

  def handle_cast({:push, value}, state) do
    {:noreply, [value | state]}
  end
end
