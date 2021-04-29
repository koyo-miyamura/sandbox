require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event_owner = FactoryBot.create(:user)
    @event = FactoryBot.create(:event, owner: @event_owner)
    sign_in_as @event_owner
  end

  test '更新' do
    put event_url(@event), params: { event: { name: 'koyo' } }

    @event.reload
    assert_equal('koyo', @event.name)
  end

  test '自分がつくったイベントは削除できる' do
    assert_difference('Event.count', -1) do
      delete event_url(@event)
    end
  end

  test '他の人がつくったイベントは削除できない' do
    event_owner = FactoryBot.create(:user)
    event = FactoryBot.create(:event, owner: event_owner)
    sign_in_user = FactoryBot.create(:user)
    sign_in_as sign_in_user
    assert_difference('Event.count', 0) do
      assert_raises(ActiveRecord::RecordNotFound) do
        delete event_url(event)
      end
    end
  end
end
