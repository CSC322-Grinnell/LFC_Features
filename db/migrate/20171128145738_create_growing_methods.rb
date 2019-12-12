class CreateGrowingMethods < ActiveRecord::Migration[5.1]
  def change
    create_table :growing_methods do |t|

      t.timestamps
    end
  end
end
