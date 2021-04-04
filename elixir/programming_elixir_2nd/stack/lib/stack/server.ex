defmodule Stack.Server do
  use GenServer
  alias Stack.Impl

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
