class CreateJoinTableFarmOperation < ActiveRecord::Migration[5.1]
  def change
    create_join_table :farms, :operations do |t|
       t.index [:farm_id, :operation_id]
       t.index [:operation_id, :farm_id]
    end
  end
end
