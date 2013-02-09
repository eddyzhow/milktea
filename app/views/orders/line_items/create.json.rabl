object @line_item

if @line_item.errors.empty?
  extends "orders/line_items/base"
else
  node :errors do |li|
    li.errors
  end
end

