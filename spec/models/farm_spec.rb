require 'rails_helper'

RSpec.describe Farm, type: :model do
#  pending "add some examples to (or delete) #{__FILE__}"
    it "Creates a new farm" do
        #Fill in this test
        testFarm = Farm.create!(name: "Test2", address: "123 St", password: "123456", phone: 3140614241, facebook: "facebook.com/test2", twitter: "twitter/farm2", created_at: "2018-011-18 20:45:00", updated_at: nil, approved: false, original_id: 1, email: "test2@example.com", contact_name: "Barb", year: 2018, statement: "She is your rich old granny", other_media: nil, link_to_cert: nil, growth_promoter: false, antibiotic: false,fav_activity: "", primary_operation_id: 2)
        expect(Farm.first).to eq(testFarm)
        expect(Farm.count).to eq(1)
    end
    
    it "should return true for admin" do
        f = Farm.new
        f.role = :admin
        expect(f.admin?).to be true
    end
  
    it "should set the default role" do
        farm = Farm.new
        farm.set_default_role
        expect(farm.role).to eq("farm") #given string representation
    end
end
