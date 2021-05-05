require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event_owner = FactoryBot.create(:user)
    @event = FactoryBot.create(:event, owner: @event_owner)
    sign_in_as @event_owner
  end

  test '更新' do
    updated_name = 'k' * Constants::EVENT_MAX_NAME_COLUMN_LENGTH
    put event_url(@event), params: { event: { name: updated_name } }, xhr: true

    @event.reload
    assert flash[:notice]
    assert_equal(updated_name, @event.name)
  end

  test '更新失敗' do
    assert_no_changes :@event do
      put event_url(@event), params: { event: { name: 'k' * (Constants::EVENT_MAX_NAME_COLUMN_LENGTH + 1) } }, xhr: true
    end
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
