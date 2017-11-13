class FarmsController < ApplicationController

  before_action :authenticate
  def show

  end


  def index
    @farms = Farm.all
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

  def apiJson
    @farms = Farm.all
    @farms_json = buildJson
    puts @farms_json
  end

  def buildJson
    render :json => Farm.all
  end

  def review
    @invalid_farms = nil
    @invalid_farms = Farm.where(approved: false)
    render :json => @invalid_farms
  end

  protected
  def authenticate
    puts "haha"
    authenticate_with_http_token do |token, options|
      return @token = token
    end
  end

  #private
  def farm_params
    params.require(:farm).permit(:name, :address, :url, :phone, :facebook, :instagram, :twitter)
  end




end
