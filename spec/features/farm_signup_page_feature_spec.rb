require 'rails_helper'

RSpec.feature "Farm signup exsists when", :type => :feature do
  scenario "User goes directly to signup page" do
    visit '/signup'
    expect(page.current_path).to eq('/signup')
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
  end
  
  scenario " with missing name" do
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "1234567890"
    click_button "Submit"
    expect(page).to have_content('Name can\'t be blank')
  end
  
  scenario "with an missing email" do
    fill_in "Name", :with => "Test Farm"
    fill_in "Password", :with => "1234567890"
    click_button "Submit"
    expect(page).to have_content('Email can\'t be blank')
  end
  
  scenario "with an invalid password" do
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "123"
    
    expect {click_button "Submit"}.to raise_error
    
    #Figure out what we want to have it do when this scenario arises
  end
end