class OrdersController < ApplicationController
  include LineItemsModule

  def index
		respond_to do |format|
			format.html
			format.json { render :json => Order.all.to_json(
				:include => { :line_items => { 
					:include => { :drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } } ,
					:only => [:id, :total_price, :quantity, :sweet_level, :owner]} }, 
				:only => [:order_date]).html_safe }
		end
	end

	def create

		line_items = Array.new

		params[:order][:line_items].each do |li|
			line_items << create_new_line_item(li)
		end

		order = Order.new(
			:order_date => Date.strptime(params[:order][:order_date]),
			:line_items => line_items
		)

		respond_to do |format|
			if order.save
				format.json { render :json => order.to_json(
				:include => { :line_items => { 
					:include => { :drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } } ,
					:only => [:id, :total_price, :quantity, :sweet_level, :owner]} }, 
				:only => [:order_date]).html_safe, :status => :created }
			else
				format.json { render :json => order.errors, :status => :unprocessable_entity }
			end
		end
	end

	def show
		order_date = Date.strptime(params[:order_date])
		order = Order.find_by_order_date(order_date)
		respond_to do |format|
			format.json { render :json => order.to_json(
				:include => { :line_items => { 
					:include =>  {:drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } } ,
					:only => [:id, :total_price, :quantity, :sweet_level, :owner]} }, 
				:only => [:order_date]).html_safe }
		end
	end
end
