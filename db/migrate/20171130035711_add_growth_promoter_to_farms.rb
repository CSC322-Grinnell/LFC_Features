class AddGrowthPromoterToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :growth_promoter, :boolean
  end
end
