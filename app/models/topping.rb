class Topping < ActiveRecord::Base
  attr_accessible :name, :price
  
  validates :name, :presence => true, :uniqueness => true
  validates :price, :presence => true, :numericality => { :only_integer => true }

  has_and_belongs_to_many :line_items
end
