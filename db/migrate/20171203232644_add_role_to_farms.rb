class AddRoleToFarms < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :role, :integer
  end
end
