class RetirementsController < ApplicationController
  def new
    # do nothing
  end

  def create
    if current_user.destroy
      reset_session
      redirect_to root_path, notice: '退会完了しました'
    end
  end
end
