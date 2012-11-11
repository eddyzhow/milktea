class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :total_price
      t.integer :quantity
      t.integer :sweet_level
      t.string :owner
      t.references :order, :drink
      t.timestamps
    end
  end
end
