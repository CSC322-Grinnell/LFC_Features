class Market < ApplicationRecord
  has_and_belongs_to_many :farms
  
  # To display name of market in admin page
  def display_name
    location
  end
end
