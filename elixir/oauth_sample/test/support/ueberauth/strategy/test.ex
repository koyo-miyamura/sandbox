defmodule OauthSample.Ueberauth.Strategy.Test do
  use Ueberauth.Strategy

  # NOTE: request は Strategy ごとにテストしたいので実際の Strategy モジュールを使用する
  def handle_request!(conn), do: aliased_strategy(conn).handle_request!(conn)

  defp aliased_strategy(%{private: %{ueberauth_request_options: %{options: opts}}} = _conn) do
    Keyword.fetch!(opts, :aliased_strategy)
  end

  # NOTE: callback は Strategy に関わらず成功・失敗ケースをテスト中に指定してテストできるようにしたい
  # また、実際の Strategy モジュールを使ってしまうと実際に OAuth プロバイダに HTTP リクエストしてしまうので避けたい
  # よって上記の要件を満たすために何もせず返す
  def handle_callback!(conn), do: conn
end
