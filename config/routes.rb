Rails.application.routes.draw do
  devise_for :users, controllers: { sessions:  "users/sessions", registrations:  "users/registrations", passwords: "users/passwords"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: 'app#index' 

  resources :stories do
    member do
      get ':bypass_token', to: 'stories#show'
    end
  end

  resources :users do
  	resources :stories
  end

  namespace :admin do
    get '/', to: 'adminpages#index'
    post 'score_search', to: 'adminpages#score_search'
  end

  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all

  get 'health', to: 'misc#health'
  get 'privacy', to: 'community#privacy'
  get 'community', to: 'community#community'
  get 'my_stories', to: 'community#my_stories'
  get 'how_it_works', to: 'community#how_it_works'
  get 'story_params/:id', to: 'community#story_params', as: "story_params"
  patch 'update_story_params/:id', to: 'community#update_story_params', as: "update_story_params"

end
