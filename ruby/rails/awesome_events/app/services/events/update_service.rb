module Events
  class UpdateService < BaseService
    def initialize(user:, event_id:, event_params:, is_remove_image:)
      @user            = user
      @event_id        = event_id
      @event_params    = event_params
      @is_remove_image = is_remove_image
    end

    def call
      event = @user.created_events.find(@event_id)

      begin
        event.with_lock do
          event.image = nil if @is_remove_image
          event.update!(@event_params)
        end
      rescue ActiveRecord::RecordInvalid => e
        event = e.record
      end

      event
    end
  end
end
