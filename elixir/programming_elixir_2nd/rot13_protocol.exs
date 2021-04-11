defprotocol Caesar do
  def encrypt(string, shift)
  def rot13(string)
end
