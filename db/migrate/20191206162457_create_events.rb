class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :event_name
      t.string :time
      t.string :location
      t.integer :recurring
      t.string :summary

      t.timestamps
    end
  end
end
