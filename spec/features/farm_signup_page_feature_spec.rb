require 'rails_helper'

RSpec.feature "Farm signup exsists when", :type => :feature do
  scenario "User goes directly to signup page" do
    visit '/signup'
   # expect(page).to be '/farms/new'
  end
  scenario "User clicks the signup link from home page" do
    visit "/"
    click_link "Sign up"
    expect(page.current_path).to eq(new_farm_path)
  end

end



RSpec.feature "Farmer tries to sign up", :type => :feature do
  #Testing the form found in /views/farms/new.html.erb

  before (:each) do
    visit "/farms/new"

    fill_in "Name", :with => "Test Farm"
    fill_in "Address", :with => "1115 8th Ave Grinnell, IA 50112"
    fill_in "Url", :with => "example.com"
    fill_in "Phone", :with => "123-456-7890"
    fill_in "Facebook", :with => "testFarm"
    fill_in "Instagram", :with => "testFarm"
    fill_in "Twitter", :with => "@testFarm"
  end
  
  scenario " with valid input" do
    farm_count_initial = Farm.count
    
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "1234567890"
    
    byebug
    
    page.check("farm_operations_19")
    #find(:css, "#farm_operations_19[value='19']").set(true)
    
    click_button "Submit"
    
    farm_count_final = Farm.count

    expect(farm_count_final - farm_count_initial).to eq(1)
    #response.should redirect_to '/submission' #Not yet working on the farms/new
  end
  
  scenario "with an invalid email" do
    fill_in "Email", :with => "123example.com" #an invalid email
    fill_in "Password", :with => "1234567890"
    expect {click_button "Submit"}.to raise_error
    

    #Figure out what we want to have it do when this scenario arises
  end
  
  scenario "with an invalid password" do
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "123"
    
    expect {click_button "Submit"}.to raise_error
    
    #Figure out what we want to have it do when this scenario arises
  end
end