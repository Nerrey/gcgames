class WorksController < ApplicationController

  layout "ladmin"

  def new

    @game = Work.new

  end

  def create
    puts @game
    redirect_to "/admin/tools"
  end

  def addimage

    

  end

end
