class StaticController < ApplicationController
  
  def index
  
  end

  def work
    @text = params[:page]
    render :layout => false
  end

end
