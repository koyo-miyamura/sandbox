defmodule Token do
  def token_receiver() do
    receive do
      { pid, token } ->
        send pid, token
        token_receiver()
    end
  end

  def run() do
    pid = spawn(Token, :token_receiver, [])
    send pid, { self(), "fred" }
    send pid, { self(), "betty" }
    received()
  end

  def received() do
    receive do
      token ->
        IO.inspect token
        received()
      after 500 ->
        "Done"
    end
  end
end
