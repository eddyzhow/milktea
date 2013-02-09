attributes :id => :id, :owner => :owner, :quantity => :quantity, :sweet_level => :sweetLevel, :total_price => :totalPrice

child :drink do
  extends "drinks/base"
end

child :toppings do
  extends "toppings/base"
end