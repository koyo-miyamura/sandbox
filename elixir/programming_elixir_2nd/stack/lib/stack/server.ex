defmodule Stack.Server do
  use GenServer
  alias Stack.Impl

  def start_link(init_stack) do
    GenServer.start_link(__MODULE__, init_stack, name: __MODULE__)
  end

  def init(stack) do
    {:ok, stack}
  end

  def handle_call(:pop, _from, state) do
    {value, new_state} = Impl.pop(state)
    {:reply, value, new_state}
  end

  def handle_call(:show, _from, state) do
    {:reply, state, state}
  end

  def handle_cast({:push, value}, state) do
    {:noreply, Impl.push(state, value)}
  end
end
