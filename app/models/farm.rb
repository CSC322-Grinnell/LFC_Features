class Farm < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :farms_operations
  has_many :operations, through: :farms_operations
  has_and_belongs_to_many :growing_methods
  has_and_belongs_to_many :selling_methods
  has_and_belongs_to_many :markets
  belongs_to :primary_operation, class_name: "Operation", foreign_key: "primary_operation_id"
  validates_confirmation_of :password

  enum role: [:farm, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :farm
  end

  def admin?
    self.role.to_sym == :admin #Converted self.role to symbol since it's stored in self as a string
  end
end
