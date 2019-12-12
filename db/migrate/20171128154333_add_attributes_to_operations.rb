class AddAttributesToOperations < ActiveRecord::Migration[5.0]
  def change
    add_column :operations, :farm_id, :integer
    add_column :operations, :food, :string
  end
end
