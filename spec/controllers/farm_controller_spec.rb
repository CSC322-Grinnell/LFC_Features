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
  #Testing the form found in /views/farms/index.html.erb
  
  before (:each) do
    visit "/farms"

    fill_in "Name", :with => "Test Farm"
    fill_in "Address", :with => "1115 8th Ave Grinnell, IA 50112"
    fill_in "Url", :with => "example.com"
    fill_in "Phone", :with => "123-456-7890"
    fill_in "Facebook", :with => "testFarm"
    fill_in "Instagram", :with => "testFarm"
    fill_in "Twitter", :with => "@testFarm"
  end
  
  scenario "User creates a new farm properly" do
    
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
  
   scenario "User tries to create a farm without a valid email" do
    fill_in "Email", :with => "123example.com" #an invalid email
    fill_in "Password", :with => "1234567890"
    
=begin 
  This test is failing because the Farm.create! method
  requires market, growing_method, selling_methods, and 
  operations to be a part of the farm as well. These will
  either need to be in the form or fixed in the
  farms_controller.rb
  
=end    
   expect {click_button "Submit"}.to raise_error
    

    #Figure out what we want to have it do when this scenario arises
  end
  
  scenario "User tries to create a farm with an invalid password" do
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "123"
    
    expect {click_button "Submit"}.to raise_error
    
    #Figure out what we want to have it do when this scenario arises
  end
end