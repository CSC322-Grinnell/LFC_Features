require 'rails_helper'

RSpec.describe Market, type: :model do
  before :each do
    market_params = {location: "Test"}
    @testMarket = Market.create!(market_params)
  end
  
  describe "new" do
    it "should return a market object" do
      expect(@testMarket).to be_an_instance_of Market
    end
  end
  
  describe "display_name" do
    it "should display the right market name" do
      expect(@testMarket.display_name).to eql "Test"
    end
  end
  
  describe "farms" do
    before :each do
      @testMarket.farms << Farm.new(name: "Test",
                                        password: "123456",
                                        email: "test@example.com",
                                        id: 1)
      @testMarket.reload
    end
    
    it "should hold on to farms when I save them" do
      expect(@testMarket.farms.count).to eql 1
    end
    
    it "should save the right farm" do
      expect(@testMarket.farms.find(1).name).to eql "Test"
    end
  end
end
