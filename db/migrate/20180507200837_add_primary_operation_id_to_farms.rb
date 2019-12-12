class AddPrimaryOperationIdToFarms < ActiveRecord::Migration[5.1]
def change
    add_column :farms, :primary_operation_id, :string
  end
end
