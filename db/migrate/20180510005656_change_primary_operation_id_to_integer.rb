class ChangePrimaryOperationIdToInteger < ActiveRecord::Migration[5.0]
  #   def change
  #     change_column :farms, :primary_operation_id, 'integer USING CAST(primary_operation_id AS integer)'
  #   end

  def self.up
    change_column :farms, :primary_operation_id, :integer
  end

  def self.down
    change_column :farms, :primary_operation_id, :string
  end
end
