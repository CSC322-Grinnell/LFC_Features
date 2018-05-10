class ChangePrimaryOperationIdToInteger < ActiveRecord::Migration[5.0]
   def change
    change_column :farms, :primary_operation_id, :integer
  end
end
