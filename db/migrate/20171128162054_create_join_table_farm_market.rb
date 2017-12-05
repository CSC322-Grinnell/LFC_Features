class CreateJoinTableFarmMarket < ActiveRecord::Migration[5.0]
  def change
    create_join_table :farms, :markets do |t|
       t.index [:farm_id, :market_id]
       t.index [:market_id, :farm_id]
    end
  end
end
