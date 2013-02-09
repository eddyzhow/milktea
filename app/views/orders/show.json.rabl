object @order

if @order.errors.empty?
  extends "orders/base"
else
  node :errors do |o|
    o.errors
  end
end

