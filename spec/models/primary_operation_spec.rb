require 'rails_helper'

RSpec.describe PrimaryOperation, type: :model do
  before :each do
    primary_operation_params = {food: "test"}
    @testPrimaryOperation = PrimaryOperation.create!(primary_operation_params)
  end
  
  describe "new" do
    it "should return a primary operation object" do
      expect(@testPrimaryOperation).to be_an_instance_of PrimaryOperation
    end
  end
  
  describe "display_name" do
    it "should display the right primary operation name" do
      expect(@testPrimaryOperation.display_name).to eql "test"
    end
  end
end
