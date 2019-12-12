class AddOriginalId < ActiveRecord::Migration[4.2]
  def change
    add_column(:farms, :original_id, :boolean) 
  end
end
