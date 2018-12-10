class PrimaryOperation < ApplicationRecord
	has_one :operation
	
  def display_name
    food
  end
end
