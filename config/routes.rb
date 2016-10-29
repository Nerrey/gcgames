Rails.application.routes.draw do

  # get 'admin/tools'

  match '/admin/tools', :to => "admin#tools", :as => :admin_tools, via: [:get, :post]

  root to: 'static#index'
  
  devise_for :users, controllers: {sessions: 'users/sessions'}

  match '/work/:page', :to => "static#work", :as => :work, via: [:get, :post]
  match '/create', :to => "admin#create", :as => :create, via: [:get, :post]
  match '/work_create', :to => "works#create", :as => :work_create, via: [:get, :post]
  match '/form/new', :to => "works#new", :as => :new_work, via: [:get, :post]
  match '/addimage', :to => "works#addimage", :as => :addimage, via: [:get, :post]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # match '/admin/tools', :to => "admin_tools#admin", :as => :admin_tools, via: [:get, :post]
end
