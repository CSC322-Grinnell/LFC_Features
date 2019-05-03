class FarmsController < ApplicationController

  before_action :skip_authorization
  before_action :authenticate
  skip_before_action :verify_authenticity_token #disable security check?
  # before_action :authenticate_farm!

  def show
    @show_farms = Farm.where(approved: true)
    @invalid_farms = Farm.where(approved: false)
    @farm = Farm.find(params[:id])
  end

#This is also not what a index page should look like
  def index
    #@farm = Farm.all
    # authorize @farm


    @show_farms = Farm.where(approved: true)
    # @operation_farms = Farm.where(operation: beef)
    # @farms_json = buildJson @show_farms
    # puts @farms_json
  end

  def new
    @farm = Farm.new
  end

  def create
    @farm = Farm.new(farm_params)
    params[:farm][:markets].each do |m|
      if (m=="")
        next
      end
      market = Market.find(m)
      @farm.markets << market
    end

    params[:farm][:growing_methods].each do |g|
      if (g=="")
        next
      end
      gmethod = GrowingMethod.find(g)
      @farm.growing_methods << gmethod
    end

    params[:farm][:selling_methods].each do |s|
      if (s=="")
        next
      end
      smethod = SellingMethod.find(s)
      @farm.selling_methods << smethod
    end

    params[:farm][:operations].each do |o|
      if (o=="")
        next
      end
      operation = Operation.find(o)
      @farm.operations << operation
    end
    
    if @farm.save
      redirect_to @farm, notice: "Test Notice Text"
    else
      render :new
    end
    
  end

  def review
    @invalid_farms = Farm.where(approved: false)
    render :review
    # @review_json = buildJson @invalid_farms
    # puts @review_json
  end

  def approved
    # the approved page html currently doesn't exist. The approved page is from an
    # earlier group, and it isn't clear what it should do or why it should exist
    # outside of activeadmin
    render :approved
  end

  def farm_json
    show_farms = Farm.where(approved: true).includes([:operations, :growing_methods, :selling_methods])
    render json: show_farms.as_json(include: [:operations, :growing_methods, :selling_methods, :markets])
  end

  def farm_by_operation
    show_farms = []
    Operation.all.each do |o|
      if params[:farms][:operations].include? o.food 
        show_farm = o.farms 
        show_farm.each do |farm|
          if (!show_farms.include? farm)
            show_farms.push(farm)
          end
        end
      end
    end
    render json: show_farms.as_json(include: [:operations, :growing_methods, :selling_methods])
  end
  

  def approve
    id = params[:item_id]
    f = Farm.find(id)
    f.approved = true
    f.save
  end

  def update
    @farm = Farm.find(params[:id])
    authorize @farm
    if @farm.update_attributes(secure_params)
      redirect_to farms_path, :notice => "Farm updated"
    else
      redirect_to farms_path, :alert => "Unable to update farm."
    end
  end

  def destroy
    farm = Farm.find(params[:id])
    authorize farm
    farm.destroy
    redirect_to users_path, :notice => "Farm deleted."
  end

  def reject
    id = params[:item_id]
    Farm.destroy(id)
  end

  protected
  def authenticate
    authenticate_with_http_token do |token, options|
      return @token = token
    end
  end

  #private
  def farm_params
    params.require(:farm).permit(:name, :address, :url, :phone, :facebook, 
      :instagram, :twitter, :email, :contact_name, :year, :statement, 
      :other_media, :link_to_cert, :growth_promoter, :antibiotic, 
      :fav_activity, :why_farm, :primary_operation_id, :password, :password_confirmation, :market, 
      :grow_method, :sell_method, :operation)
  end

  private
  def secure_params
    params.require(:farm).permit(:role)
  end

  def current_ability
    @current_ability ||= Ability.new(@farm)
  end
end
