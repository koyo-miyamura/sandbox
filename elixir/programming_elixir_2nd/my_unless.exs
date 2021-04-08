defmodule My do
  defmacro unless(condition, clauses) do
    do_clause = Keyword.get(clauses, :do, nil)
    else_clause = Keyword.get(clauses, :else, nil)
    quote do
      case unquote(condition) do
       val when val in [true, nil] -> unquote(else_clause)
      _ -> unquote(do_clause)
      end
    end
  end
end
