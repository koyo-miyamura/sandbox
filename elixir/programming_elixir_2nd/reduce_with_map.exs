defmodule M do
  @doc """
    Map with reduce.

  ## Examples
    iex> M.do_add_words(["aa", "bb", "hoge"], %{})
    %{2 => ["bb", "aa"], 4 => ["hoge"]}

    iex> M.do_add_words(["aa", "bb", "hoge"], %{ 2 => ["cc"]})
    %{2 => ["bb", "aa", "cc"], 4 => ["hoge"]}
  """
  def do_add_words(words, map), do: Enum.reduce(words, map, &do_add_word(&1,&2))

  defp do_add_word(word, map), do: Map.update(map, String.length(word), [word], &[word|&1])
end
