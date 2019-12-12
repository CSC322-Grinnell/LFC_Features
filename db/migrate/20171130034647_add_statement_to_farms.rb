class AddStatementToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :statement, :text
  end
end
