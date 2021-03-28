defmodule Token do
  require Logger

  def token_receiver() do
    receive do
      { pid, token } ->
        send pid, token
        token_receiver()
    end
  end

  def run() do
    Logger.info("Start running ...")
    pid = spawn(Token, :token_receiver, [])
    send pid, { self(), "fred" }
    send pid, { self(), "betty" }
    received()
    Logger.info("Finish")
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

IO.puts "Start"
Token.run
IO.puts "Done"
