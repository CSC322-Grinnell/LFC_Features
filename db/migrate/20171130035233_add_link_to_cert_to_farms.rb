class AddLinkToCertToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :link_to_cert, :text
  end
end
