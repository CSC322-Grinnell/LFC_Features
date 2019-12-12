class ChangeValidField < ActiveRecord::Migration[5.1]
  def change
    rename_column :farms, :valid, :approved
  end
end
