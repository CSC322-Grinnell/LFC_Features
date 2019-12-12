class RemoveFarmIdFromOperations < ActiveRecord::Migration[5.0]
  def change
    remove_column :operations, :farm_id, :integer
  end
end
