class FarmsController < ApplicationController

  before_action :authenticate

  def show
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
    @show_farms = Farm.where(approved: true)
    # @farms_json = buildJson @show_farms
    # puts @farms_json
  end

  def new
    @farm = Farm.new
  end

  def create
    @farm = Farm.new(farm_params)
    if @farm.save
      redirect_to @farm
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
    render :approved
  end

  def farm_json
    @show_farms = Farm.where(approved: true)
    @farms_json = buildJson @show_farms
  end

  def buildJson farms
    render :json => farms
  end

  def approve
    id = params[:item_id]
    f = Farm.find(id)
    f.approved = true
    f.save
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
    params.require(:farm).permit(:name, :address, :url, :phone, :facebook, :instagram, :twitter)
  end

  def current_ability
    @current_ability ||= Ability.new(@farm)
  end
end
