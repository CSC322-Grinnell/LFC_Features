class FarmsController < ApplicationController

  before_action :authenticate
  def show

  end

  def index
    @show_farms = Farm.where(approved: true)
    @farms_json = buildJson @show_farms
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
    @review_json = buildJson @invalid_farms
    # puts @review_json
  end

  def apiJson
    @show_farms = Farm.where(approved: true)
    @farms_json = buildJson @show_farms
  end

  def buildJson farms
    render :json => farms
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




end
