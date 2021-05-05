module Events
  class UpdateService < BaseService
    def initialize(user:, event_id:, event_params:)
      @user         = user
      @event_id     = event_id
      @event_params = event_params
    end

    def call
      event = @user.created_events.find(@event_id)

      begin
        event.with_lock do
          event.image = nil if delete_image?
          event.update!(update_event_columns)
        end
      rescue ActiveRecord::RecordInvalid => e
        event = e.record
      end

      event
    end

    private

    def delete_image?
      ActiveRecord::Type::Boolean.new.cast(@event_params[:remove_image])
    end

    def update_event_columns
      @event_params.reject { |k, _v| k == 'remove_image' }
    end
  end
end
