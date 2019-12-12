class AddOriginalId < ActiveRecord::Migration[5.1]
  def change
    add_column(:farms, :original_id, :boolean) 
  end
end
