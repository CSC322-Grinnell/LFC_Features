class GrowingMethod < ApplicationRecord
    belongs_to :farm, :class_name => "Farm"
end
