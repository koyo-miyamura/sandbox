class EventsController < ApplicationController
  skip_before_action :authenticate, only: :show

  def new
    @event = current_user.created_events.build
  end

  def create
    @event = Events::CreateService.call(
      user: current_user,
      event_params: event_params
    )
    if @event.errors.empty?
      redirect_to @event, notice: '作成しました'
    end
  end

  def show
    @event = Event.find(params[:id])
    @ticket = current_user&.tickets&.find_by(event: @event)
    @tickets = @event.tickets.includes(:user).order(:created_at)
  end

  def edit
    @event = current_user.created_events.find(params[:id])
  end

  def update
    @event = Events::UpdateService.call(
      user: current_user,
      event_id: params[:id],
      event_params: event_params,
      is_remove_image: remove_image?
    )
    if @event.errors.empty?
      redirect_to @event, notice: '更新しました'
    end
  end

  def destroy
    Events::DeleteService.call(
      user: current_user,
      event_id: params[:id]
    )

    redirect_to root_path, notice: '削除しました'
  end

  private

  def permit_params
    params.require(:event).permit(
      :name, :place, :image, :remove_image, :content, :start_at, :end_at
    )
  end

  def event_params
    permit_params.reject { |k, _v| k == 'remove_image' }.to_hash
  end

  def remove_image?
    ActiveRecord::Type::Boolean.new.cast(permit_params[:remove_image])
  end
end
