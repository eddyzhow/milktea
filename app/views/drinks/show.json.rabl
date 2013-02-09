object @drink

if @drink.errors.empty?
  extends "drinks/base"
else
  node :errors do |d|
    d.errors
  end
end