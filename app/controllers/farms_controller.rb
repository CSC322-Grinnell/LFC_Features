class FarmsController < ApplicationController
  
  before_action :authenticate

  def index
    @farms = Farm.all
    @farms_json = buildJson
    puts @farms_json
  end

  def buildJson
    render :json => Farm.all
  end
  
  
  protected
  def authenticate
    puts "haha"
    authenticate_with_http_token do |token, options|
      return @token = token
    end
  end

end
