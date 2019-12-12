class AddAttributesToMarkets < ActiveRecord::Migration[5.0]
  def change
    add_column :markets, :farm_id, :integer
    add_column :markets, :location, :string
  end
end
