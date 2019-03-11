require 'rails_helper'

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
                  statement: "I like farming",
                  other_media: nil,
                  link_to_cert: nil,
                  growth_promoter: false,
                  antibiotic: false,
                  fav_activity: "",
                  primary_operation_id: 2)
  
    @id = f.id
  end
  scenario "when a farm is created" do
    visit 
    fill_in 'Name', with: "Test Name"
    fill_in 'Email', with: "Test@a.com"
    fill_in 'Password', with: "TestNamde"
    fill_in 'U', with: "Test Name"
    fill_in 'Name', with: "Test Name"
    fill_in 'Name', with: "Test Name"
    fill_in 'Name', with: "Test Name"
  end
  
  scenario "An unlogged in user clicks on the edit link" do
    #Get the login page
    #Check the login authentication
    #Redirect to the farm's edit page
    #Assert that we are on the edit page
  end
  
  scenario "A logged in user goes to the edit page" do
    #Assert that the user is logged in
    #Redirect to the user's farm's edit page
    #Assert that we are on the correct page
  end
  
  scenario "An unlogged in user attempts to access the edit page directly" do
    #Get the farm's edit page
    #Assert that an error is raised denying access
  end

end

RSpec.feature "A valid user attempts to edit their farm by", :type => :feature do
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
                  statement: "I like farming",
                  other_media: nil,
                  link_to_cert: nil,
                  growth_promoter: false,
                  antibiotic: false,
                  fav_activity: "",
                  primary_operation_id: 2)
  
    @id = f.id
    #Get the login page
    #Enter the login creds for Test2
    #Get the edit page for f.id
    
    
  end
  scenario "Updating the farm's name" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's password" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's email" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's primary contact name" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's URL" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
   scenario "Updating the farm's telephone number" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's facebook" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
   scenario "Updating the farm's instagram" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's twitter" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
   scenario "Updating the farm's market" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
   scenario "Updating the farm's growing methods" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
   scenario "Updating the farm's selling methods" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
   scenario "Updating the farm's operations" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's statement" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  scenario "Updating the farm's media" do
    #Fill in field with new data
    #Click submit
    #Expect that the farm's field is now updated
  end
  
  after(:all)
end