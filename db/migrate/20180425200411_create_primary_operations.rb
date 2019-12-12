class CreatePrimaryOperations < ActiveRecord::Migration[5.1]
  def change
    create_table :primary_operations do |t|
      t.string :food

      t.timestamps
    end
  end
end
