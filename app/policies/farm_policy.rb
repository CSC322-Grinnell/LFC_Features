class FarmPolicy
    attr_reader :current_farm, :model

    def initialize(current_farm, model)
        @current_farm = current_farm
        @farm = model
    end

    def index?
      @current_farm.admin?
    end

    def edit?
      @current_farm.admin? or @current_farm == @farm
    end

    def show?
      true
      # @current_farm.admin?
    end

    def update?
      @current_farm.admin? or @current_farm == @farm
    end

    def destroy?
      return false if @current_farm == @farm
      @current_farm.admin?
    end
end
