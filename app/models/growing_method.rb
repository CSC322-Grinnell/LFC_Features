class GrowingMethod < ApplicationRecord
    has_and_belongs_to_many :farms
def display_name
  grow_method
end
end
