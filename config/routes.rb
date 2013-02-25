Milktea::Application.routes.draw do

	root :to => 'application#index'

	resources :drinks, :only => [:index, :create, :show, :destroy]
	resources :toppings, :only => [:index, :create, :show, :destroy]

	match 'orders/' => 'orders#index', :via => :get
	match 'orders/' => 'orders#create', :via => :post
	match 'orders/:order_date' => 'orders#show', :via => :get

	namespace :orders, :path => 'orders/:order_date' do
		resources :line_items, :only => [:index, :create, :destroy]
	end
end
