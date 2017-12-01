class Farm < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable

  # TODO: replace with DB field
  def admin?
    self.email == "admin@example.com"
  end
end
