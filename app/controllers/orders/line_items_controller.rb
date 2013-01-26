class Orders::LineItemsController < ApplicationController
  include LineItemsModule

  def index
    order = Order.find_by_order_date(params[:order_date])
    line_items = order.line_items
    respond_to do |format|
      format.json { render :json => line_items.to_json(:include => {:drink => {:only => [:id, :name, :price]}, :toppings => {:only => [:id, :name, :price]}}, :only => [:id, :owner, :quantity, :sweet_level, :total_price]).html_safe }
    end
  end

  def create
    order = Order.find_by_order_date(params[:order_date])

    line_item = create_new_line_item(params[:line_item])
    order.line_items << line_item

    respond_to do |format|
      if order.save
        format.json { render :json => line_item.to_json(:include => {:drink => {:only => [:id, :name, :price]}, :toppings => {:only => [:id, :name, :price]}}, :only => [:id, :owner, :quantity, :sweet_level, :total_price]).html_safe, :status => :created }
      else
        unless line_item.errors.empty?
          format.json { render :json => line_item.errors, :status => :unprocessable_entity }
        end
        format.json { render :json => order.errors, :status => :unprocessable_entity }
      end
    end
  end
end
