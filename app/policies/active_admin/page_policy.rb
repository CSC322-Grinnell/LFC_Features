class ActiveAdmin::PagePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def show?
    case record.name
    when 'Dashboard'
      true
    else
      user.admin?
    end
  end
end
