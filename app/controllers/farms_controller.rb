class FarmsController < ApplicationController

  before_filter :skip_authorization
  before_action :authenticate
  skip_before_action :verify_authenticity_token #disable security check?
  # before_action :authenticate_farm!

  def show
    # @farm = Farm.find(parmas[:id])
    # authorize @farm
    @show_farms = Farm.where(approved: true)
    @invalid_farms = Farm.where(approved: false)
    if params[:id] == "farm_json"
      farm_json
    elsif params[:id] == "review"
      return review
    elsif params[:id] == "approved"
      return approved
    end
  end

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
    @farm = Farm.create!(farm_params)
    if @farm.save
      redirect_to @farm
    else
      render :new
    end

    params[:market].each do |m|
      @market = Market.find_by location: m
      @farm.market << @market
    end

    params[:growing_methods].each do |g|
      @gmethod = GrowingMethod.find_by grow_method: g
      @farm.grow_method << @gmethod
    end

    params[:selling_methods].each do |s|
      @smethod = SellingMethod.find_by sell_method: s
      @farm.sell_method << @smethod
    end

    params[:operations].each do |o|
      @operation = Operation.find_by food: o
      @farm.operation << @operation
    end
  end

  def review
    @invalid_farms = Farm.where(approved: false)
    render :review
    # @review_json = buildJson @invalid_farms
    # puts @review_json
  end

  def approved
    render :approved
  end

  def farm_json
    show_farms = Farm.where(approved: true).includes([:operations, :growing_methods, :selling_methods])
    render json: show_farms.as_json(include: [:operations, :growing_methods, :selling_methods])
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
      :fav_activity, :why_farm, :operations, :primary_operation_id)
  end

  private
  def secure_params
    params.require(:farm).permit(:role)
  end

  def current_ability
    @current_ability ||= Ability.new(@farm)
  end
end
