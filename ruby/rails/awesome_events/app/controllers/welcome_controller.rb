class WelcomeController < ApplicationController
  skip_before_action :authenticate

  def index
    # do something
  end
end
