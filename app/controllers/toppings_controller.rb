class ToppingsController < ApplicationController
  respond_to :json

	def index
    @toppings = Topping.all
  end

  def create
    @topping = Drink.new(params[:topping])
    @topping.save
    respond_with(@topping)
  end

  def show
    @topping = Topping.find(params[:id])
  end
end
