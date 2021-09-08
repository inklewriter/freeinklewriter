Rails.application.routes.draw do
  devise_for :users, controllers: { sessions:  "users/sessions", registrations:  "users/registrations", passwords: "users/passwords"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: 'app#index' 

  resources :stories

  resources :users do
  	resources :stories
  end

  namespace :admin do
    get '/', to: 'adminpages#index'
    post 'score_search', to: 'adminpages#score_search'
  end

  match "/404", :to => "errors#not_found", :via => :all
  match "/500", :to => "errors#internal_server_error", :via => :all
  get 'health', to: 'pages#health'
  get 'privacy', to: 'pages#privacy'
  get 'community', to: 'pages#community'
  get 'user_account', to: 'pages#user_account'
  get 'how_it_works', to: 'pages#how_it_works'
  get 'story_params/:id', to: 'pages#story_params', as: "story_params"
  patch 'update_story_params/:id', to: 'pages#update_story_params', as: "update_story_params"

end
