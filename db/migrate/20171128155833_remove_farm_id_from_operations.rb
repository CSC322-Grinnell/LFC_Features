class RemoveFarmIdFromOperations < ActiveRecord::Migration[5.1]
  def change
    remove_column :operations, :farm_id, :integer
  end
end
