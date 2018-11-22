require 'rails_helper'

=begin
RSpec.describe "farm page", :type => :feature do
  it "should create a new farm" do
    get "/farms"
    farm1 = Farm.new
    
    post "/farms", farm: farm1, name: "Test2", address: "123 St",url: "example.com", phone: 3140614241, facebook: "facebook.com/test2", twitter: "twitter/farm2"
    
    expect(Farm.count).to eq(1)
  end
end

=end

RSpec.feature "Farm Signup", :type => :feature do
  scenario "User creates a new farm" do
    visit "/farms" #Testing the form found in /views/farms/index.html.erb

    fill_in "Name", :with => "Test Farm"
    fill_in "Address", :with => "1115 8th Ave Grinnell, IA 50112"
    fill_in "Url", :with => "example.com"
    fill_in "Phone", :with => "123-456-7890"
    fill_in "Facebook", :with => "testFarm"
    fill_in "Instagram", :with => "testFarm"
    fill_in "Twitter", :with => "@testFarm"
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "1234567890"
    
=begin 
  This test is failing because the Farm.create! method
  requires market, growing_method, selling_methods, and 
  operations to be a part of the farm as well. These will
  either need to be in the form or fixed in the
  farms_controller.rb
  
=end    
    click_button "Submit"

    response.should redirect_to '/submission'
  end
end