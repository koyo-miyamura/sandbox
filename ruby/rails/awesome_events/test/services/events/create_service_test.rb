require 'test_helper'

class EventsCreateServiceTest < ActiveSupport::TestCase
  setup do
    @user = FactoryBot.create(:user)
  end

  test 'create' do
    now = Time.zone.now
    param = ActionController::Parameters.new(
      {
        name: 'a' * Constants::EVENT_MAX_NAME_COLUMN_LENGTH,
        place: 'a' * Constants::EVENT_MAX_PLACE_COLUMN_LENGTH,
        content: 'a' * Constants::EVENT_MAX_CONTENT_COLUMN_LENGTH,
        start_at: now,
        end_at: now + 60
      }
    ).permit(:name, :place, :image, :content, :start_at, :end_at)

    assert_difference 'Event.count', 1 do
      Events::CreateService.call(user: @user, event_params: param)
    end
  end
end
