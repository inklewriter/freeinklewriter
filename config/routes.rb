Rails.application.routes.draw do
  devise_for :users, controllers: { sessions:  "devise_overrides/sessions", registrations:  "devise_overrides/registrations"
}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'pages#index'
  
end
