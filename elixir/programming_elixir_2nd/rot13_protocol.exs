defprotocol Caesar do
  def encrypt(string, shift)
  def rot13(string)
end

defimpl Caesar, for: BitString do
  def encrypt(string, shift) do
    string |> String.to_charlist |> Caesar.encrypt(shift) |> List.to_string
  end
  def rot13(string) do
    encrypt(string, 13)
  end
end

defimpl Caesar, for: List do
  def encrypt(string, shift) do
    Enum.map(string, &_encrypt(&1, shift)) |> Enum.join |> String.to_charlist
  end
  def rot13(string) do
    encrypt(string, 13)
  end

  defp _encrypt(char, shift) do
    [?a + rem(char + shift - ?a, 26)]
  end
end
