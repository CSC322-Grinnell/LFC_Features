class AddRoleToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :role, :integer
  end
end
