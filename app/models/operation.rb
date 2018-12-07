class Operation < ApplicationRecord
	has_many :farms_operations
  has_many :farms, through: :farms_operations

  #To display name of the operation in the admin page
  def display_name
    food
  end
end
