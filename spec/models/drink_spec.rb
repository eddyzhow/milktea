# spec/models/drink.rb

# Factory(:user) is a shortcut for Factory.create(:user) so within your setup you are creating two objects and saving them to the database.
# Factory.build(:user) will create you a user record without saving it to the DB.

require 'spec_helper'

describe Drink do
  it "has a valid factory" do
    FactoryGirl.create(:drink).should be_valid
  end
  it "is invalid without a name" do
    FactoryGirl.build(:drink, name: nil).should_not be_valid
  end
  it "is invalid without a price" do
    FactoryGirl.build(:drink, price: nil).should_not be_valid
  end
  it "is invalid if name is not unique" do
    FactoryGirl.create(:drink)
    FactoryGirl.build(:drink).should_not be_valid
  end
  it "is invalid if price is not integer" do
    FactoryGirl.build(:drink, price: 20.1234).should_not be_valid
  end
end