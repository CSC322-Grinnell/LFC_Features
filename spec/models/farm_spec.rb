require 'rails_helper'

RSpec.describe Farm, type: :model do
    before :each do
        @testFarm = Farm.create!(name: "Test",
                                address: "123 St",
                                password: "123456",
                                phone: 123456,
                                facebook: "facebook.com/test",
                                twitter: "twitter/test",
                                created_at: "2018-011-18 20:45:00",
                                updated_at: nil, 
                                approved: false,
                                original_id: 1,
                                email: "test@example.com", 
                                contact_name: "Barb",
                                year: 2018, 
                                statement: "I'm a test farm",
                                other_media: nil,
                                link_to_cert: nil, 
                                growth_promoter: false, 
                                antibiotic: false, 
                                fav_activity: "", 
                                primary_operation_id: 1)
    end
    
    describe "#new" do
        it "should return a farm object" do
            expect(@testFarm).to be_an_instance_of Farm
        end
    end
    
    describe "#admin" do
        it "should return true for admin" do
            @testFarm.role = :admin
            expect(@testFarm.admin?).to eql true
        end
    end

    describe "#default_role" do
        it "should set the default role" do
            @testFarm.set_default_role
            expect(@testFarm.role).to eql "farm"
        end
    end
end
