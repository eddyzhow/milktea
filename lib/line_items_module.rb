module LineItemsModule
  def create_new_line_item(li)
    toppings = Array.new

    li[:toppings].each do |t|
      toppings << Topping.find(t[:id])
    end

    line_item = LineItem.new(
        :owner => li[:owner],
        :quantity => li[:quantity],
        :sweet_level => li[:sweet_level],
        :total_price => li[:total_price],
        :drink => Drink.find(li[:drink][:id]),
        :toppings => toppings
    )
  end
end