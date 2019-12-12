class AddOtherMediaToFarms < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :other_media, :string
  end
end
