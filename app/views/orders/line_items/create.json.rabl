object @line_item

if @line_item.errors.empty?
  extends "orders/line_items/base"
else
  node :errors do |li|
    camelize_hash_key(li.errors.as_json)
  end
end

