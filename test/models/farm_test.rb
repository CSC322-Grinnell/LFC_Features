require 'test_helper'


class FarmTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end 
  test "should create a new farm in the database" do
    testFarm = Farm.create(name: "Test2", address: "123 St", phone: 3140614241, facebook: "facebook.com/test2", twitter: "twitter/farm2", created_at: "2018-011-18 20:45:00", updated_at: nil, approved: false, original_id: 1, email: "test2@gmal.com", contact_name: "Barb", year: 2018, statement: "She is your rich old granny", other_media: nil, link_to_cert: nil, growth_promoter: false, antibiotic: false,fav_activity: "", primary_operation_id: 2)
    assert Farm.last.to eq(testFarm)
      end
end
