require 'rails_helper'

RSpec.describe Farm, type: :model do
  before :each do
    farm_params = {name: "Test",
                    address: "123 St",
                    password: "123456",
                    phone: 123456,
                    email: "test@example.com"}
    @testFarm = Farm.create!(farm_params)
  end
    
  describe "new" do
    it "should return a farm object" do
      expect(@testFarm).to be_an_instance_of Farm
    end
  end
    
  describe "admin" do
    it "should return true for admin" do
      @testFarm.role = :admin
      expect(@testFarm.admin?).to eql true
    end
  end

  describe "default_role" do
    it "should set the default role" do
      @testFarm.set_default_role
      expect(@testFarm.role).to eql "farm"
    end
  end
  
  describe "operations" do
    it "should hold on to operations when I save them" do
      @testFarm.operations << Operation.new(food: "test")
      @testFarm.reload
      expect(@testFarm.operations.count).to eql 1
    end
    
    it "should save the right operation" do
      @testFarm.operations << Operation.new(food: "test", id: 1)
      @testFarm.reload
      expect(@testFarm.operations.find(1).food).to eql "test"
    end
  end
end
