class EventPolicy < ApplicationPolicy
    def event?
        true
    end
    def index?
        true
    end
    def create? 
        true
    end
    def edit?
        true
    end
    def destroy?
        true
    end
  end