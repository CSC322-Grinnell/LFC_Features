rsprequire 'rails_helper'

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
    before :each do
      @testFarm.operations << Operation.new(food: "test", id: 1)
      @testFarm.reload
    end
    
    it "should hold on to operations when I save them" do
      expect(@testFarm.operations.count).to eql 1
    end
    
    it "should save the right operation" do
      expect(@testFarm.operations.find(1).food).to eql "test"
    end
  end
  
  describe "growing methods" do
    before :each do
      @testFarm.growing_methods << GrowingMethod.new(grow_method: "Test", id: 1)
      @testFarm.reload
    end
    
    it "should hold on to growing methods when I save them" do
      expect(@testFarm.growing_methods.count).to eql 1
    end
    
    it "should save the right growing method" do
      expect(@testFarm.growing_methods.find(1).grow_method).to eql "Test"
    end
  end
  
  describe "selling methods" do
    before :each do
      @testFarm.selling_methods << SellingMethod.new(sell_method: "Test", id: 1)
      @testFarm.reload
    end
    
    it "should hold on to selling methods when I save them" do
      expect(@testFarm.selling_methods.count).to eql 1
    end
    
    it "should save the right selling method" do
      expect(@testFarm.selling_methods.find(1).sell_method).to eql "Test"
    end
  end
  
  describe "markets" do
    before :each do
      @testFarm.markets << Market.new(location: "Test", id: 1)
      @testFarm.reload
    end
    
    it "should hold on to markets when I save them" do
      expect(@testFarm.markets.count).to eql 1
    end
    
    it "should save the right market" do
      expect(@testFarm.markets.find(1).location).to eql "Test"
    end
  end
end
