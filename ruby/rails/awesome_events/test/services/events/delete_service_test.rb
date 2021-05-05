require 'test_helper'

class EventsUpdateServiceTest < ActiveSupport::TestCase
  setup do
    @user = FactoryBot.create(:user)
    @event = FactoryBot.create(:event, owner: @user)
  end

  test 'delete' do
    @event.stub(:destroy!, nil) do
      Events::DeleteService.call(
        user: @user,
        event_id: @event.id
      )
    end
  end
end
