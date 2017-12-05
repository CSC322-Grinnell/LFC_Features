class RemoveFarmIdFromMarkets < ActiveRecord::Migration[5.0]
  def change
    remove_column :markets, :farm_id, :integer
  end
end
