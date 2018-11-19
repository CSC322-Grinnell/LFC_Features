require 'rails_helper'

RSpec.describe "home page", :type => :request do
  it "should create a new farm" do
    get "/farms"
    farm1 = Farm.new
    
    post "/farms", farm: farm1, name: "Test2", address: "123 St",url: "example.com", phone: 3140614241, facebook: "facebook.com/test2", twitter: "twitter/farm2"
    
    expect(Farm.count).to eq(1)
  end
end