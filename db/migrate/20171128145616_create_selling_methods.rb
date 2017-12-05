class CreateSellingMethods < ActiveRecord::Migration[5.0]
  def change
    create_table :selling_methods do |t|

      t.timestamps
    end
  end
end
