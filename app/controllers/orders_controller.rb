class OrdersController < ApplicationController
	def index
		respond_to do |format|
			format.html
			format.json { render :json => Order.all.to_json(
				:include => { :line_items => { 
					:include => { :drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } } ,
					:only => [:total_price, :quantity, :sweet_level, :owner]} }, 
				:only => [:order_date]).html_safe }
		end
	end

	def create

		line_items = Array.new

		params[:order][:line_items].each do |li|
			
			toppings = Array.new

			li[:toppings].each do |t|
				toppings << Topping.find(t[:id])
			end

			line_items << LineItem.new(
				:owner => li[:owner],
				:quantity => li[:quantity],
				:sweet_level => li[:sweet_level],
				:total_price => li[:total_price],
				:drink => Drink.find(li[:drink][:id]),
				:toppings => toppings
			)
		end

		@order = Order.new(
			:order_date => Date.strptime(params[:order][:order_date]),
			:line_items => line_items
		)

		respond_to do |format|
			if @order.save
				format.json { render :json => @order.to_json(
				:include => { :line_items => { 
					:include => { :drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } } ,
					:only => [:total_price, :quantity, :sweet_level, :owner]} }, 
				:only => [:order_date]).html_safe, :status => :created, :location => @order }
			else
				format.json { render :json => @order.errors, :status => :unprocessable_entity }
			end
		end
	end

	def show
		order_date = Date.strptime(params[:order_date])
		@order = Order.find_by_order_date(order_date)
		respond_to do |format|
			format.json { render :json => @order.to_json(
				:include => { :line_items => { 
					:include =>  {:drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } } ,
					:only => [:total_price, :quantity, :sweet_level, :owner]} }, 
				:only => [:order_date]).html_safe }
		end
	end
end