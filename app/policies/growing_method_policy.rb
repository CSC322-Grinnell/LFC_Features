class GrowingMethodPolicy < ApplicationPolicy
    def growing_method?
        true
    end
    def create?
        true
    end
    def index?
        true
    end
    def edit?
        true
    end
    def destroy?
        true
    end
  end