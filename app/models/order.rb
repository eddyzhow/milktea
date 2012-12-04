class Order < ActiveRecord::Base
  attr_accessible :order_date, :line_items

  has_many :line_items, :dependent => :destroy

  validates :order_date, :uniqueness => true
end
