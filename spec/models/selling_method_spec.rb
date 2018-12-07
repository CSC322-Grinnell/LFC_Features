require 'rails_helper'

RSpec.describe SellingMethod, type: :model do
  before :each do
    selling_method_params = {sell_method: "Test"}
    @testSellingMethod = SellingMethod.create!(selling_method_params)
  end
  
  describe "new" do
    it "should return a selling_method object" do
      expect(@testSellingMethod).to be_an_instance_of SellingMethod
    end
  end
  
  describe "display_name" do
    it "should display the right selling_method name" do
      expect(@testSellingMethod.display_name).to eql "Test"
    end
  end
  
  describe "farms" do
    before :each do
      @testSellingMethod.farms << Farm.new(name: "Test",
                                        password: "123456",
                                        email: "test@example.com",
                                        id: 1)
      @testSellingMethod.reload
    end
    
    it "should hold on to farms when I save them" do
      expect(@testSellingMethod.farms.count).to eql 1
    end
    
    it "should save the right farm" do
      expect(@testSellingMethod.farms.find(1).name).to eql "Test"
    end
  end
end
