require 'application_system_test_case'

class WelcomsTest < ApplicationSystemTestCase
  test '/ ページを表示' do
    visit root_url

    assert_selector 'h1', text: 'イベント一覧'
  end

  test 'ページネーションする' do
    (1..(Constants::EVENTS_PER_PAGE + 1)).to_a.each { FactoryBot.create(:event) }

    visit root_url

    assert_selector 'ul.pagination'
  end

  test 'ページネーションしない' do
    (1..(Constants::EVENTS_PER_PAGE - 1)).to_a.each { FactoryBot.create(:event) }

    visit root_url

    assert_no_selector 'ul.pagination'
  end
end
