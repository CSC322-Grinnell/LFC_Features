class AddContactNameToFarms < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :contact_name, :string
  end
end
