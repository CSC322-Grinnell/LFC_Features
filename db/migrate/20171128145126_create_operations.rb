class CreateOperations < ActiveRecord::Migration[5.0]
  def change
    create_table :operations do |t|

      t.timestamps
    end
  end
end
