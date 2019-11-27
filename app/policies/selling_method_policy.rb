class SellingMethodPolicy < ApplicationPolicy
    def selling_method?
        true
    end
    def index?
        true
    end
    def edit?
        true
    end
    def create?
        true
    end
    def destroy?
        true
    end
  end