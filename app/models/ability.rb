class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= Farm.new
    if user.admin?
      admin_rules(user)
    else
      farm_rules(user)
    end
  end

  def admin_rules(user)
    can :edit, Farm
  end

  def farm_rules(user)
    cannot [:edit, :destroy], Farm
  end
end
