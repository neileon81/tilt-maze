class ApplicationController < ActionController::Base
  def index
    @scores = Score.first(5)
  end
end
