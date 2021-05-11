defmodule Sample do
  def fun do
    with {:ok, _} <- hoge() do
      IO.puts("ok")
    end
  end

  def here() do
    file = """
    defmodule PhoenixSampleWeb do
      def view do
        quote do
          use Phoenix.View,
            root: "lib/phoenix_sample_web/templates",
            namespace: PhoenixWeb
        end
      end
    end
    """
    file
  end

  defp hoge() do
    {:error, "reason"}
  end
end

IO.inspect Sample.fun()
IO.inspect Sample.here()
