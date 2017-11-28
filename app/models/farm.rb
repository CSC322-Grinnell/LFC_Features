class Farm < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable

    has_many :operations, :class_name => "Operation"
    has_many :growing_methods, :class_name => "GrowingMethod"
    has_many :selling_methods, :class_name => "SellingMethod"
    has_many :markets, :class_name => "Market"

end
