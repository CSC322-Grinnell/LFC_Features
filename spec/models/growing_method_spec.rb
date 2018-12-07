require 'rails_helper'

RSpec.describe GrowingMethod, type: :model do
  before :each do
    growing_method_params = {grow_method: "Test"}
    @testGrowingMethod = GrowingMethod.create!(growing_method_params)
  end
  
  describe "new" do
    it "should return a growing_method object" do
      expect(@testGrowingMethod).to be_an_instance_of GrowingMethod
    end
  end
  
  describe "display_name" do
    it "should display the right growing_method name" do
      expect(@testGrowingMethod.display_name).to eql "Test"
    end
  end
  
  describe "farms" do
    before :each do
      @testGrowingMethod.farms << Farm.new(name: "Test",
                                        password: "123456",
                                        email: "test@example.com",
                                        id: 1)
      @testGrowingMethod.reload
    end
    
    it "should hold on to farms when I save them" do
      expect(@testGrowingMethod.farms.count).to eql 1
    end
    
    it "should save the right farm" do
      expect(@testGrowingMethod.farms.find(1).name).to eql "Test"
    end
  end
end
