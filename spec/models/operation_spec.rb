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
      expect(@testOperation).display_name.to eql "test"
    end
  end
end
