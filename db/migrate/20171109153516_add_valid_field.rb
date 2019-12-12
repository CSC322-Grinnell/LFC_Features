class AddValidField < ActiveRecord::Migration[5.1]
  def change
    add_column :farms, :valid, :boolean, default: false  
    
    #Farm.all.each do |farm|
     # farm.update_attributes!(:valid => 'false')
    #end
  end
end
