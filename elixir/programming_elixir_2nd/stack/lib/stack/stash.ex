defmodule Stack.Stash do
  use GenServer

  @me __MODULE__

  def start_link(init_stash) do
    GenServer.start_link(__MODULE__, init_stash, name: @me)
  end

  def get(), do: GenServer.call(@me, {:get})

  def update(new_state), do: GenServer.cast(@me, {:update, new_state})

  def init(init_stash) do
    {:ok, init_stash}
  end

  def handle_call({:get}, _from, state) do
    {:reply, state, state}
  end

  def handle_cast({:update, new_state}, _state) do
    {:noreply, new_state}
  end
end
