module LineItemsModule
  def create_new_line_item(li)
    toppings = Array.new

    li[:toppings].each do |t|
      toppings << Topping.find(t[:id])
    end

    if li[:drink].nil?
      drink = nil
    else
      drink = Drink.find(li[:drink][:id])
    end

    line_item = LineItem.new(
        :owner => li[:owner],
        :quantity => li[:quantity],
        :sweet_level => li[:sweet_level],
        :total_price => li[:total_price],
        :drink => drink,
        :toppings => toppings
    )
  end
end