class ChangeValidField < ActiveRecord::Migration[5.0]
  def change
    rename_column :farms, :valid, :approved
  end
end
