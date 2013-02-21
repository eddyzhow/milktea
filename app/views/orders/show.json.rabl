object @order

if @order.errors.empty?
  extends "orders/base"
else
  node :errors do |o|
    camelize_hash_key(o.errors.as_json)
  end
end

