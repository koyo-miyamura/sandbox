defmodule RedixSampleTest do
  use ExUnit.Case
  doctest RedixSample

  test "greets the world" do
    assert RedixSample.hello() == :world
  end
end
