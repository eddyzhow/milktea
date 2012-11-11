# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Drink.create([
	{:name => 'Milk Tea', :price => 30}, 
	{:name => 'Black Tea', :price => 25},
  	{:name => 'Green Tea', :price => 25}])

Topping.create([	
	{:name => 'Bubble', :price => 5},
	{:name => 'Pudding', :price => 5},
	{:name => 'Whip Cream', :price => 5}])

milk_tea = Drink.find_by_name('Milk Tea')
black_tea = Drink.find_by_name('Black Tea')
bubble = Topping.find_by_name('Bubble')
pudding = Topping.find_by_name('Pudding')
whip_cream = Topping.find_by_name('Whip Cream')

line_items = LineItem.create([{ 
  	:total_price => 40, 
  	:quantity => 1, 
  	:sweet_level => 3, 
  	:owner => 'Eddy',
	:drink => milk_tea,
	:toppings => [bubble, pudding]
  },{
	:total_price => 35, 
	:quantity => 1, 
	:sweet_level => 1, 
	:owner => 'Eddy',
	:drink => black_tea,
	:toppings => [whip_cream, pudding]
  }])

Order.create(:order_date => Date.new(2012,9,19), :line_items => line_items)