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
    visit "/farms"

    fill_in "Name", :with => "Test Farm"
    fill_in "Address", :with => "Test Farm"
    fill_in "Url", :with => "Test Farm"
    fill_in "Phone", :with => "Test Farm"
    fill_in "Facebook", :with => "Test Farm"
    fill_in "Instagram", :with => "Test Farm"
    fill_in "Twitter", :with => "Test Farm"
    
    click_button "Submit"

    response.should redirect_to '/submission'
  end
end