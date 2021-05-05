module Events
  class CreateService < BaseService
    def initialize(user, event_params)
      @user = user
      @event_params = event_params
    end

    def call
      event = @user.created_events.build(@event_params)
      event.save

      event
    end
  end
end
