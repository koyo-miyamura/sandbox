module Events
  class DeleteService < BaseService
    def initialize(user:, event_id:)
      @user            = user
      @event_id        = event_id
    end

    def call
      event = @user.created_events.find(@event_id)
      event.with_lock do
        event.destroy!
      end
    end
  end
end
