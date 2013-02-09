class OrdersController < ApplicationController
  include LineItemsModule

  respond_to :json

  def index
    @orders = Order.all
	end

	def create
		line_items = Array.new

		params[:order][:line_items].each do |li|
			line_items << create_new_line_item(li)
		end

		@order = Order.new(
			:order_date => Date.strptime(params[:order][:order_date]),
			:line_items => line_items
		)

    @order.save
    respond_with(@order)
	end

	def show
		order_date = Date.strptime(params[:order_date])
		@order = Order.find_by_order_date!(order_date)
	end
end
