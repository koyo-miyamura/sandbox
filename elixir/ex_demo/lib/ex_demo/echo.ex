defmodule ExDemo.Echo do
  require Logger

  def start do
    Logger.info("start echo server (1) on 8080 port ...")
    accept(8080)
  end

  def accept(port) do
    # The options below mean:
    #
    # 1. `:binary` - receives data as binaries (instead of lists)
    # 2. `packet: :line` - receives data line by line
    # 3. `active: false` - blocks on `:gen_tcp.recv/2` until data is available
    # 4. `reuseaddr: true` - allows us to reuse the address if the listener crashes
    #
    {:ok, socket} =
      :gen_tcp.listen(port, [:binary, packet: :line, active: false, reuseaddr: true])

    Logger.info("Accepting connections on port #{port}")
    loop_acceptor(socket)
  end

  defp loop_acceptor(socket) do
    {:ok, client} = :gen_tcp.accept(socket)
    serve(client)
    loop_acceptor(socket)
  end

  defp serve(socket) do
    socket
    |> read_line()
    |> handle_read(socket)
  end

  defp read_line(socket) do
    case :gen_tcp.recv(socket, 0) do
      {:ok, data} -> data
      {:error, reason} -> reason
    end
  end

  defp handle_read(:closed, socket) do
    :gen_tcp.close(socket)
  end

  defp handle_read(line, socket) do
    write_line(line, socket)
    serve(socket)
  end

  defp write_line(line, socket) do
    :gen_tcp.send(socket, line)
  end
end
