class Drink < ActiveRecord::Base
  attr_accessible :name, :price
  
  validates :name, :presence => true, :uniqueness => true
  validates :price, :presence => true, :numericality => { :only_integer => true }
end
