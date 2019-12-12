class AddYearToFarms < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :year, :integer
  end
end
