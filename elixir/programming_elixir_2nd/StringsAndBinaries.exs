defmodule MyString do
  def anagram?(str1, str2) do
    Enum.sort(str1) == Enum.sort(str2)
  end
end
