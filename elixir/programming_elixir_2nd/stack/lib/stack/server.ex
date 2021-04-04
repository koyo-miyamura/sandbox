defmodule Stack.Server do
  use GenServer

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
