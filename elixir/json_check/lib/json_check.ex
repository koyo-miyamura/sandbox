defmodule JsonCheck do
  @moduledoc """
  ファイルの各行が Json として valid か判定する
  """

  @doc """
  Hello world.

  ## Examples

      iex> JsonCheck.check("test/data/example_ok.log")
      []

      iex> JsonCheck.check("test/data/example_ng.log")
      [{{:error, %Jason.DecodeError{data: "{\\"ng 2\\":{}", position: 10, token: nil}}, 2}]

  """
  def check(file_path) do
    File.read!(file_path)
    |> String.split("\n")
    |> Enum.filter(&(&1 != ""))
    |> Enum.map(&Jason.decode(&1))
    |> Enum.with_index(1)
    |> Enum.filter(fn {{result, _reason}, _line} -> result == :error end)
  end
end
