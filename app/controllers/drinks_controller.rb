class DrinksController < ApplicationController
  respond_to :json

  def index
    @drinks = Drink.all
  end

  def create
    @drink = Drink.new(params[:drink])
    @drink.save
    respond_with(@drink)
  end

  def show
    @drink = Drink.find(params[:id])
  end

  def destroy
    @drink = Drink.find(params[:id])
    @drink.destroy
    render :nothing => true
  end
end
