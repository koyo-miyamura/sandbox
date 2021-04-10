defmodule Times do
  defmacro times_n(n) do
    quote do
      def unquote(:"times_#{n}")(input), do: input * unquote(n)
    end
  end
end

defmodule Test do
  require Times

  Times.times_n(3)
  Times.times_n(4)
end
