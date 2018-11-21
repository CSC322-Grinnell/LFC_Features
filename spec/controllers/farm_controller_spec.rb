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
    fill_in "Address", :with => "Test Farm"
    fill_in "Url", :with => "Test Farm"
    fill_in "Phone", :with => "Test Farm"
    fill_in "Facebook", :with => "Test Farm"
    fill_in "Instagram", :with => "Test Farm"
    fill_in "Twitter", :with => "Test Farm"
    
    #The following fields need to be added to the form.
    fill_in "Email", :with => "testfarm@example.com"
    fill_in "Password", :with => "1234567890"
    
    click_button "Submit"

    response.should redirect_to '/submission'
  end
end