class LineItemsToppings < ActiveRecord::Migration
  def change
  	create_table :line_items_toppings do |t|
  		t.references :line_item, :topping
  	end
  end
end
