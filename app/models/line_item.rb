class LineItem < ActiveRecord::Base
  attr_accessible :owner, :quantity, :sweet_level, :total_price, :drink, :toppings

  belongs_to :order
  belongs_to :drink
  has_and_belongs_to_many :toppings

  validates :owner, :presence => true
  validates :quantity, :presence => true, :numericality => { :only_integer => true } 
  validates :sweet_level, :inclusion => { :in => 1..5 }
  validate :total_price_need_to_be_equal_to_sum_of_toppings_and_drink_prices

  def total_price_need_to_be_equal_to_sum_of_toppings_and_drink_prices
  	sum_price = drink.price
  	toppings.each do |t|
  		sum_price = sum_price + t.price
  	end
  	errors.add(:total_price, "is not equal to sum of drink and toppings.") if total_price != sum_price
  end 
end
