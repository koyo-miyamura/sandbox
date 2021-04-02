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
    start_log()

    pid = spawn(Token, :token_receiver, [])
    for name <- ["fred", "betty"] do
      send pid, { self(), name }
    end

    received()

    finish_log()
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

  defp start_log(), do: Logger.info("Start running ...")
  defp finish_log(), do: Logger.info("Finish")
end

IO.puts "Start"
Token.run
IO.puts "Done"
