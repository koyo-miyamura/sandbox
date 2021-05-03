module Events
  class CreateService < BaseService
    def initialize(current_user, event_params)
      @current_user = current_user
      @event_params = event_params
    end

    def call
      event = @current_user.created_events.build(@event_params)
      event.save

      event
    end
  end
end
