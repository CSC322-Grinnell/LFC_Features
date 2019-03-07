class AddNewColumnToMyTable < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :farm_type, :string
  end
end
