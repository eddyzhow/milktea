class ToppingsController < ApplicationController
	def index
    @toppings = Topping.all 
    respond_to do |format|
      format.json { render :json => @toppings.to_json(:only => [:id, :name, :price]).html_safe }
    end
  end

  def create
    @topping = Drink.new(params[:topping])
    respond_to do |format|
      if @topping.save
        format.json { render :json => @topping.to_json(:only => [:id, :name, :price]).html_safe, 
          :status => :created, :location => @topping }
      else
        format.json { render :json => @topping.errors, :status => :unprocessable_entity }
      end
    end    
  end

  def show
    @topping = Topping.find(params[:id])
    respond_to do |format|
      format.json { render :json => @topping.to_json(:only => [:id, :name, :price]).html_safe }
    end
  end
end
