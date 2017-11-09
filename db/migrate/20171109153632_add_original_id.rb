class AddOriginalId < ActiveRecord::Migration
  def change
    add_column(:farms, :original_id, :boolean) 
  end
end
