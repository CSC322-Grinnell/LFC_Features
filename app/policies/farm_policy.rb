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
      @current_farm.admin? or @current_farm == Farm.find(params[:id])
    end

    def show?
      @current_farm.admin?
    end

    def update?
      @current_farm.admin?
    end

    def destroy?
      return false if @current_farm == @farm
      @current_farm.admin?
    end
end
