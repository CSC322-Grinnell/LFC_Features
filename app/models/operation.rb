class Operation < ApplicationRecord
     has_and_belongs_to_many :farms
def display_name
  food
end
end
