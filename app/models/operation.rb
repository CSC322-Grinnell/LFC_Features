class Operation < ApplicationRecord
     has_and_belongs_to_many :farms

 #To display name of the operation in the admin page
def display_name
  food
end
end
