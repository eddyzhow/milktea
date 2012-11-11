class DrinksController < ApplicationController
  def index
    @drinks = Drink.all 
    respond_to do |format|
      format.json { render :json => @drinks.to_json(:only => [:id, :name, :price]).html_safe }
    end
  end

  def create
    @drink = Drink.new(params[:drink])
    respond_to do |format|
      if @drink.save
        format.json { render :json => @drink.to_json(:only => [:id, :name, :price]).html_safe, 
          :status => :created, :location => @drink }
      else
        format.json { render :json => @drink.errors, :status => :unprocessable_entity }
      end
    end    
  end

  def show
    @drink = Drink.find(params[:id])
    respond_to do |format|
      format.json { render :json => @drink.to_json(:only => [:id, :name, :price]).html_safe }
    end
  end
end
