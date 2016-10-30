class WorksController < ApplicationController

  layout "ladmin"

  def new
    @game = Work.new
    @game.images.build
  end

  def create
    Work.create(work_params)
    redirect_to "/admin/tools"
  end

  def addimage

    
  end

  def warning

  end

  def delete
    redirect_to "/admin/tools"
  end
  
  private

  def work_params
    params.require(:work).permit(:name, :description, images_attributes: [:image])
  end


end
