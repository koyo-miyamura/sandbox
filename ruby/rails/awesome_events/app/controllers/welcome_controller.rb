class WelcomeController < ApplicationController
  skip_before_action :authenticate

  def index
    @events = Event.page(params[:page]).per(Constants::EVENTS_PER_PAGE).future_events.order(:start_at)
  end
end
