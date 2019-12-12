class AddOtherMediaToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :other_media, :string
  end
end
