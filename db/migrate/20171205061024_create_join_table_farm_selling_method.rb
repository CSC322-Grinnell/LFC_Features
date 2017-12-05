class CreateJoinTableFarmSellingMethod < ActiveRecord::Migration[5.0]
  def change
    create_join_table :farms, :selling_methods do |t|
      t.index [:farm_id, :selling_method_id]
      t.index [:selling_method_id, :farm_id]
    end
  end
end
