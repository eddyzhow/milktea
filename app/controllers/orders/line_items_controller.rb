module Orders extend Orders
	class LineItemsController < ApplicationController
		def index
			order = Order.find_by_order_date(params[:order_date])
			line_items = order.line_items
			respond_to do |format|
				format.json { render :json => line_items.to_json(:include => { :drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } }, :only => [:id, :owner, :quantity, :sweet_level, :total_price]).html_safe }
			end
		end

	  def create
	  	order = Order.find_by_order_date(params[:order_date])

	  	line_item = Orders::create_new_line_item(params[:line_item])
	  	order.line_items << line_item

	  	respond_to do |format|
	  		if order.save
				format.json { render :json => line_item.to_json(:include => { :drink => { :only => [:id, :name, :price] }, :toppings => { :only => [:id, :name, :price] } }, :only => [:id, :owner, :quantity, :sweet_level, :total_price]).html_safe, :status => :created }	  			
	  		else
	  			format.json { render :json => order.errors, :status => :unprocessable_entity }
	  		end
	  	end
	  end
	end

	def create_new_line_item(li)
		toppings = Array.new

		li[:toppings].each do |t|
	  		toppings << Topping.find(t[:id])
	  	end

	  	line_item = LineItem.new(
	  		:owner => li[:owner],
				:quantity => li[:quantity],
				:sweet_level => li[:sweet_level],
				:total_price => li[:total_price],
				:drink => Drink.find(li[:drink][:id]),
				:toppings => toppings
	  	)
	end
end