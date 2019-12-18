require 'rails_helper'

RSpec.feature "Header Features", :type => :feature do
  before (:each) do
    visit root_path
  end
  
  context "header elements are present" do
    scenario "should contain the logo" do
      expect(page).to have_css("img[src*='logo.png']")
    end
    
    scenario "should contain the home tab" do
      expect(page).to have_content("HOME")
    end
    
    scenario "should contain the events tab" do
      expect(page).to have_content("EVENTS")
    end
    
    scenario "should contain the signup tab" do
      expect(page).to have_content("SIGN UP")
    end
    
    scenario "should contain the signin tab" do
      expect(page).to have_content("SIGN IN")
    end
  end
  
  context "header responds as expected" do
    scenario "clicking the LFC logo should redirect to the LFC website" do
      expect(page).to have_link(nil, href: 'https://www.localfoodsconnection.com')
    end
    
    scenario "clicking the home tab should redirect to root_path" do
      click_link("Home")
      expect(page.current_path).to eq(root_path)
    end

    scenario "clicking the events tab should redirect to the events page" do
      click_link("Events")
      expect(page.current_path) == ('/calenders')
    end
    
    scenario "clicking the signup tab should redirect to signup page" do
      click_link("Sign up")
      expect(page.current_path).to eq(new_farm_path)
    end
    
    scenario "clicking the the signin tab redirects to signin page" do
      click_link("Sign In")
      expect(page.current_path) == ('/admin/login')
    end
  end
end
