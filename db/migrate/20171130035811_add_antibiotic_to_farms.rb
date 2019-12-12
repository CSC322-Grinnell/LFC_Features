class AddAntibioticToFarms < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :antibiotic, :boolean
  end
end
