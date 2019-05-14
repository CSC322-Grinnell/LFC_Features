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
  
  scenario "with an missing password" do
    fill_in "Name", :with => "Test Farm"
    fill_in "Email", :with => "testfarm@example.com"
    click_button "Submit"
    expect(page).to have_content('Password can\'t be blank')
  end
  
  scenario "with an invalid email" do
    fill_in "Name", :with => "Test Farm"
    fill_in "Email", :with => "testfarm.com"
    fill_in "Password", :with => "1234567890"
    click_button "Submit"
    expect(page).to have_content('Email is invalid')
  end
  
  scenario "with an invalid password" do
    fill_in "Name", :with => "Test Farm"
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "123"
    click_button "Submit"
    expect(page).to have_content('Password is too short (minimum is 6 characters)')
  end
  
  scenario "with password confirmation not matching password" do
    fill_in "Name", :with => "Test Farm"
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "123456"
    fill_in "Password confirmation", :with => "123455"
    click_button "Submit"
    expect(page).to have_content('Password confirmation doesn\'t match Password')
  end
end