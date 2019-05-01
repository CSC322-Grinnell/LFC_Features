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
  validates :email, format: {with: Devise.email_regexp}
  validates :name, presence: true
 
  #validate :has_at_least_one_market
  #validate :has_at_least_one_growing_method
  #validate :has_at_least_one_selling_method
  #validate :has_at_least_one_operation
  
  enum role: [:farm, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def has_at_least_one_market
    if markets.empty?
      errors.add(:markets, ": A farm must have at least one market.") 
    end
  end
  
  def has_at_least_one_growing_method
    if growing_methods.empty?
      errors.add(:growing_methods, ": A farm must have at least one growing method.") 
    end
  end
  
  def has_at_least_one_selling_method
    if selling_methods.empty?
      errors.add(:selling_methods, ": A farm must have at least one selling method.") 
    end
  end
  
  def has_at_least_one_operation
    if operations.empty?
      errors.add(:operations, ": A farm must have at least one operation.") 
    end
  end
  
  def set_default_role
    self.role ||= :farm
  end

  def admin?
    self.role.to_sym == :admin #Converted self.role to symbol since it's stored in self as a string
  end
end
