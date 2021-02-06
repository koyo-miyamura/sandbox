defmodule CsvSigil do
  def sigil_v(lines, _opts) do
    lines
    |> String.trim_trailing
    |> String.split("\n")
    |> Enum.map(&String.split(&1, ","))
  end
end

defmodule Main do
  import CsvSigil
  def main do
    IO.inspect ~v"""
    1,2,3
    4,5,6
    """
  end
end

Main.main
