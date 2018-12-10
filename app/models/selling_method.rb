class SellingMethod < ApplicationRecord
  has_and_belongs_to_many :farms
  
  # To display selling_method in admin page
  def display_name
    sell_method
  end
end
