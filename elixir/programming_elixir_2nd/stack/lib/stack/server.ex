defmodule Stack.Server do
  use GenServer
  alias Stack.Impl

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  def init(_) do
    {:ok, Stack.Stash.get()}
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

  def terminate(_reason, state) do
    Stack.Stash.update(state)
  end
end
