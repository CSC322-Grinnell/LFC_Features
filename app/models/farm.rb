class Farm < ActiveRecord::Base

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :farms_operations
  has_many :operations, through: :farms_operations
  has_and_belongs_to_many :growing_methods
  has_and_belongs_to_many :selling_methods
  has_and_belongs_to_many :markets
  # has_one :primary_operation_id

  enum role: [:farm, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
      self.role ||= :farm
  end

  def admin?
    self.role == "admin"
  end

end
