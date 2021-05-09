defmodule SampleTest do
  use ExUnit.Case

  test "Table test with Map" do
    tests = [
      %{
        a: 1,
        b: 2,
        expected: 3
      },
      %{
        a: 1,
        b: -1,
        expected: 0
      }
    ]

    for t <- tests do
      assert Sample.sum(t.a, t.b) == t.expected
    end
  end

  test "Table test with List" do
    tests = [
      [1, 2, 3],
      [1, -1, 0]
    ]

    for [a, b, expected] <- tests do
      assert Sample.sum(a, b) == expected
    end
  end

  describe "Table test with Map (and title)" do
    tests = [
      %{
        title: "case1",
        a: 1,
        b: 2,
        expected: 3
      },
      %{
        title: "case2",
        a: 1,
        b: -1,
        expected: 0
      }
    ]

    for t <- tests do
      @tag t: t
      test t.title, %{t: t} do
        assert Sample.sum(t.a, t.b) == t.expected
      end
    end
  end

  describe "Table test with List (and title)" do
    tests = [
      ["case1", 1, 2, 3],
      ["case2", 1, -1, 0]
    ]

    for [title | t] <- tests do
      @tag t: t
      test title, %{t: [a, b, expected]} do
        assert Sample.sum(a, b) == expected
      end
    end
  end
end
