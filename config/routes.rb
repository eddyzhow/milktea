Milktea::Application.routes.draw do
	root :to => 'application#index'

	resources :drinks, :only => [:index, :create, :show]
	resources :toppings, :only => [:index, :create, :show]

	match 'orders/' => 'orders#index', :via => :get
	match 'orders/:order_date' => 'orders#show', :via => :get
	match 'orders/:order_date' => 'orders#create', :via => :post
end
