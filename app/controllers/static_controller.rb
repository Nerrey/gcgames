class StaticController < ApplicationController
  
  def index
    @idwork = Work.all
  end

  def work
    @text = params[:page]
    @imagework = Work.find(params[:page])
    render :layout => false
  end

end
