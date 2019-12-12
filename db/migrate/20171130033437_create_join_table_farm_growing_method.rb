class CreateJoinTableFarmGrowingMethod < ActiveRecord::Migration[5.0]
  def change
    create_join_table :farms, :growing_methods do |t|
       t.index [:farm_id, :growing_method_id]
       t.index [:growing_method_id, :farm_id]
    end
  end
end
