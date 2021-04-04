defmodule Stack.Impl do
  @doc """
    Pop.

  ## Examples
    iex> Stack.Impl.pop([3,2,1])
    {3, [2,1]}
  """
  def pop([value | new_state]), do: {value, new_state}

  @doc """
    Push.

  ## Examples
    iex> Stack.Impl.push([3,2,1], 4)
    [4,3,2,1]
  """
  def push(state, value), do: [value | state]
end
