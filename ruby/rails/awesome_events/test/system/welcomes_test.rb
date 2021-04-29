require 'application_system_test_case'

class WelcomsTest < ApplicationSystemTestCase
  test '/ ページを表示' do
    visit root_url

    assert_selector 'h1', text: 'イベント一覧'
  end
end
