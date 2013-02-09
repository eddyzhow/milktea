object @topping

if @topping.errors.empty?
  extends "toppings/base"
else
  node :errors do |t|
    t.errors
  end
end