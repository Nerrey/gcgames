class AdminController < ApplicationController
  layout "ladmin"
  
  def tools
  
    @work = Work.all

  end

  def create

  end

end
