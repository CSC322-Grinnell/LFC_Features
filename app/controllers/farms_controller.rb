class FarmsController < ApplicationController

  def index
    @farms = Farm.all
    @farms_json = buildJson
    puts @farms_json
  end

  def buildJson
    render :json => Farm.all
  end

end
