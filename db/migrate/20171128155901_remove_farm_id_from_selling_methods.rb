class RemoveFarmIdFromSellingMethods < ActiveRecord::Migration[5.1]
  def change
    remove_column :selling_methods, :farm_id, :integer
  end
end
