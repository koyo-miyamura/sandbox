defmodule MyList do
  def mapsum([], _), do: 0
  def mapsum([head | tail], func) do
    func.(head) + mapsum(tail, func)
  end

  def max([head | tail]) do
    _max(tail, head)
  end
  defp _max([], current_max), do: current_max
  defp _max([head | tail], current_max) when head <= current_max do
    _max(tail, current_max)
  end
  defp _max([head | tail], current_max) when head > current_max do
    _max(tail, head)
  end

  def flatten([]), do: []
  def flatten([head | tail]) do
    flatten(head) ++ flatten(tail)
  end
  def flatten(head), do: [head]
end
