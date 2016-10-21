Rails.application.routes.draw do

  root to: 'static#index'
  match '/work/:page', :to => "static#work", :as => :work, via: [:get, :post]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
