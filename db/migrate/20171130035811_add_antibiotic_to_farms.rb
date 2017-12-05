class AddAntibioticToFarms < ActiveRecord::Migration[5.0]
  def change
    add_column :farms, :antibiotic, :boolean
  end
end
