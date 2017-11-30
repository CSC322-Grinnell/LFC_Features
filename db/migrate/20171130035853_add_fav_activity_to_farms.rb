class AddFavActivityToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :fav_activity, :text
  end
end
