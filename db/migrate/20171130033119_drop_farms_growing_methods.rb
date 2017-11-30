class DropFarmsGrowingMethods < ActiveRecord::Migration[5.0]
  def change
    drop_table :farms_growing_methods
  end
end
