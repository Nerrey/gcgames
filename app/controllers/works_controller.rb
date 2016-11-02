class WorksController < ApplicationController
  before_action :set_work, only: [:delete, :edit, :update, :destroy]
  layout "ladmin"

  def new
    @game = Work.new
  end

  def create
    Work.create(work_params)
    redirect_to "/admin/tools"
  end

  def addimage

  end

  def edit
    @game = @work
  end

  def update
    @work.update(work_params)
    redirect_to "/admin/tools"
  end

  def destroy
    @work.destroy
    redirect_to "/admin/tools"
  end
  
  private

  def work_params
    params.require(:work).permit(:name, :description, images_attributes: [:image])
  end

  def set_work
    @work = Work.find(params[:id])
  end

end
