# spec/factories/drinks.rb
FactoryGirl.define do
  factory :drink do |d|
    d.name "Milk Tea"
    d.price 30
  end
end