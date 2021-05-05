require 'test_helper'

class EventsUpdateServiceTest < ActiveSupport::TestCase
  setup do
    @user = FactoryBot.create(:user)
    @event = FactoryBot.create(:event, id: 1000, owner: @user)
    @event_params = ActionController::Parameters.new
  end

  test 'update' do
    @event.stub(:update!, nil) do
      event = Events::UpdateService.call(
        user: @user,
        event_id: @event.id,
        event_params: @event_params,
        is_remove_image: false
      )

      assert event.image.attached?
    end
  end

  test 'update: remove_image' do
    @event.stub(:update!, nil) do
      event = Events::UpdateService.call(
        user: @user,
        event_id: @event.id,
        event_params: @event_params,
        is_remove_image: true
      )

      assert_not event.image.attached?
    end
  end
end
