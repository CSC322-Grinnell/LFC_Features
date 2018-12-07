require 'rails_helper'

RSpec.describe Operation, type: :model do
  before :each do
    operation_params = {food: "test"}
    @testOperation = Operation.create!(operation_params)
  end
  
  describe "new" do
    it "should return an operation object" do
      expect(@testOperation).to be_an_instance_of Operation
    end
  end
  
  describe "display_name" do
    it "should display the right operation name" do
      expect(@testOperation.display_name).to eql "test"
    end
  end
  
  describe "farms" do
    before :each do
      @testOperation.farms << Farm.new(name: "Test",
                                        password: "123456",
                                        email: "test@example.com",
                                        id: 1)
      @testOperation.reload
    end
    
    it "should hold on to farms when I save them" do
      expect(@testOperation.farms.count).to eql 1
    end
    
    it "should save the right farm" do
      expect(@testOperation.farms.find(1).name).to eql "Test"
    end
  end
end
