class CreateMarkets < ActiveRecord::Migration[5.1]
  def change
    create_table :markets do |t|

      t.timestamps
    end
  end
end
