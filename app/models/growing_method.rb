class GrowingMethod < ApplicationRecord
    has_and_belongs_to_many :farms

# To display name of growing_method in admin page
def display_name
  grow_method
end
end
