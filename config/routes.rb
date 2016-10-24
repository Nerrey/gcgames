Rails.application.routes.draw do

  get 'admin/tools'

  root to: 'static#index'
  
  devise_for :users, controllers: {sessions: 'users/sessions'}

  match '/work/:page', :to => "static#work", :as => :work, via: [:get, :post]
  match '/create', :to => "adminc#create", :as => :create, via: [:get, :post]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
