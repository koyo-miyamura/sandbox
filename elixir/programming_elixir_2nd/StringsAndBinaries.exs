defmodule MyString do
  def anagram?(str1, str2) do
    Enum.sort(str1) == Enum.sort(str2)
  end

  def capitalize_sentences(str) do
    str
    |> String.split(". ")
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(". ")
  end
end
