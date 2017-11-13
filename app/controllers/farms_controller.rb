class FarmsController < ApplicationController

  before_action :authenticate

  def index
    #@show_farms = Farm.where(approved: true)
    #@farms_json = buildJson
    #puts @farms_json

    review
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
end
