class Farm < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable





    has_and_belongs_to_many :operations
    has_and_belongs_to_many :growing_methods
    has_and_belongs_to_many :selling_methods
    has_and_belongs_to_many :markets

end
