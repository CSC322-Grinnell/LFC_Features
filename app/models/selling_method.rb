class SellingMethod < ApplicationRecord
    has_and_belongs_to_many :farms
def display_name
  sell_method
end
end
