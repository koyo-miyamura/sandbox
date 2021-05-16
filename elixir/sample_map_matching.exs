defmodule Sample do
  def fun(map = %{k: v}) do
    IO.inspect(v)
    IO.inspect(map)
  end
end

Sample.fun(%{k: 1, other: 2})
