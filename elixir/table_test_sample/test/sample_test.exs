defmodule SampleTest do
  use ExUnit.Case
  doctest Sample

  describe "Table test with Map" do
    tests = [
      %{
        title: "case 1",
        a: 1,
        b: 2,
        expected: 3
      },
      %{
        title: "case 2",
        a: 1,
        b: -1,
        expected: 0
      }
    ]

    Enum.each(tests, fn t ->
      @title t.title
      @a t.a
      @b t.b
      @expected t.expected

      test @title do
        assert Sample.sum(@a, @b) == @expected
      end
    end)
  end

  describe "Table test with List" do
    tests = [
      ["case 1", 1, 2, 3],
      ["case 2", 1, -1, 0]
    ]

    Enum.each(tests, fn [title, a, b, expected] ->
      @title title
      @a a
      @b b
      @expected expected

      test @title do
        assert Sample.sum(@a, @b) == @expected
      end
    end)
  end
end
