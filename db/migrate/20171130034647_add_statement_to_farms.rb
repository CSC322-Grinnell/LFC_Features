class AddStatementToFarms < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :statement, :text
  end
end
