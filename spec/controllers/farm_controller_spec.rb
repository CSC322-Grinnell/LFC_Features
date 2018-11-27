require 'rails_helper'

RSpec.feature "Farm signup exits", :type => :feature do
  scenario "User goes directly to signup page" do
    visit "/farms"
   # expect(page).to be '/farms'
  end
  scenario "User clicks the signup link from home page" do
    visit "/"
    click_link "Sign Up" 
    response.should redirect_to '/farms'
  end

end



RSpec.feature "Farmer tries to sign up", :type => :feature do
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
  
   scenario "User tries to create a farm with an invalid email" do
    fill_in "Email", :with => "123example.com" #an invalid email
    fill_in "Password", :with => "1234567890"
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

RSpec.feature "Farm edit page can be reached", :type => :feature do
  before (:each) do
    f = Farm.create!(name: "Test2", 
                  address: "123 St",
                  password: "123456",
                  phone: 3140614241,
                  facebook: "facebook.com/test2",
                  twitter: "twitter/farm2",
                  created_at: "2018-011-18 20:45:00",
                  updated_at: nil,
                  approved: false,
                  original_id: 1,
                  email: "test2@example.com",
                  contact_name: "Barb",
                  year: 2018,
                  statement: "She's your rich old granny",
                  other_media: nil,
                  link_to_cert: nil,
                  growth_promoter: false,
                  antibiotic: false,
                  fav_activity: "",
                  primary_operation_id: 2)
  
    @id = f.id
  end
  scenario "A farm's edit page exists when a farm is created" do
    visit "/farms/#{@id}/edit"
  end
  
  scenario "An unlogged in user clicks on the edit link" do
    #Get the login page
    #Check the login authentication
    #Redirect to the farm's edit page
    #Assert that we are on the edit page
  end
  
  scenario "A logged in user clicks on the edit link" do
    #Assert that the user is logged in
    #Redirect to the user's farm's edit page
    #Assert that we are on the correct page
  end
  
  scenario "An unlogged in user attempts to access the edit page directly" do
    #Get the farm's edit page
    #Assert that an error is raised denying access
  end

end

RSpec.feature "A valid user attempts to edit their farm", :type => :feature do
  before (:each) do
    f = Farm.create!(name: "Test2", 
                  address: "123 St",
                  password: "123456",
                  phone: 3140614241,
                  facebook: "facebook.com/test2",
                  twitter: "twitter/farm2",
                  created_at: "2018-011-18 20:45:00",
                  updated_at: nil,
                  approved: false,
                  original_id: 1,
                  email: "test2@example.com",
                  contact_name: "Barb",
                  year: 2018,
                  statement: "She's your rich old granny",
                  other_media: nil,
                  link_to_cert: nil,
                  growth_promoter: false,
                  antibiotic: false,
                  fav_activity: "",
                  primary_operation_id: 2)
  
    @id = f.id
  end
  scenario "A logged in user edits a field" do
  
  end

end