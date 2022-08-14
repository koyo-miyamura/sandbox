defmodule ScrollSample.UsersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ScrollSample.Users` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> ScrollSample.Users.create_user()

    user
  end
end
