Rails.application.routes.draw do
  devise_for :users, controllers: { sessions:  "users/sessions", registrations:  "users/registrations", passwords: "users/passwords"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'pages#index'

 

  resources :stories

  resources :users do
  	resources :stories
  end

  namespace :admin do
    get '/', to: 'adminpages#index'
  end

  match "/404", :to => "errors#not_found", :via => :all
  match "/500", :to => "errors#internal_server_error", :via => :all
  get 'health', to: 'pages#health'
  get 'privacy', to: 'pages#privacy'

end
