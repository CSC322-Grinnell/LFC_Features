class AddAttributesToGrowingMethods < ActiveRecord::Migration[5.0]
  def change
    add_column :growing_methods, :farm_id, :integer
    add_column :growing_methods, :grow_method, :string
  end
end
