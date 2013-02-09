class Orders::LineItemsController < ApplicationController
  include LineItemsModule

  respond_to :json

  def index
    @line_items = Order.find_by_order_date(params[:order_date]).line_items
  end

  def create
    @order = Order.find_by_order_date(params[:order_date])

    @line_item = create_new_line_item(params[:line_item])
    @order.line_items << @line_item

    @order.save
    respond_with(@line_item)
  end
end
