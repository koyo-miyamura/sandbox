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

  def copy_order_list() do
    tax_rates = [ NC: 0.075, TX: 0.8 ]

    orders = [
      [ id: 123, ship_to: :NC, net_amount: 100.00 ],
      [ id: 124, ship_to: :OK, net_amount: 35.50 ],
      [ id: 125, ship_to: :TX, net_amount: 25.00 ],
      [ id: 126, ship_to: :TX, net_amount: 44.80 ],
      [ id: 127, ship_to: :NC, net_amount: 25.00 ],
      [ id: 128, ship_to: :MA, net_amount: 10.00 ],
      [ id: 129, ship_to: :CA, net_amount: 102.00 ],
      [ id: 130, ship_to: :NC, net_amount: 50.00 ],
    ]

    for order = [{ :id, _id }, { :ship_to, ship_to }, { :net_amount, net_amount }] <- orders do
      tax_rate = Keyword.get(tax_rates, ship_to, 0)
      [{:total_amount, net_amount + (net_amount * tax_rate)} | order]
    end
  end
end
