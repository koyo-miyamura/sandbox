class WelcomeController < ApplicationController
  skip_before_action :authenticate

  def index
    @events = Event.future_events.order(:start_at)
  end
end
