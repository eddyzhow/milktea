Milktea::Application.routes.draw do
	root :to => 'application#index'
  resources :drinks, :only => [:index, :create, :show]
  resources :toppings, :only => [:index, :create, :show]
  resources :orders, :only => [:index, :create, :show]
end
