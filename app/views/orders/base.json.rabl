attributes :order_date => :orderDate

child :line_items => :lineItems do
  extends "orders/line_items/base"
end