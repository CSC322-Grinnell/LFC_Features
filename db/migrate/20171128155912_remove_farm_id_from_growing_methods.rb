class RemoveFarmIdFromGrowingMethods < ActiveRecord::Migration[5.1]
  def change
    remove_column :growing_methods, :farm_id, :integer
  end
end
