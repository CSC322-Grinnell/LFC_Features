require 'rails_helper'

RSpec.feature "the header appears as expected", :type => :feature do
   before (:each) do
        visit root_path
    end
    
    scenario "the LFC logo is present" do
    #assert that the logo appears
    expect(page).to have_css("img[src*='logo.png']")
    end
    scenario "the home tab appears" do
        expect(page).to have_content("Home")
    end
    scenario "the map tab appears" do
        expect(page).to have_content("Map")
    end
    scenario "the signup tab appears" do
        expect(page).to have_content("Sign up")
    end
    scenario "the signin tab appears" do
        expect(page).to have_content("Sign In")
    end

end

RSpec.feature "the header responds as expected", :type => :feature do
    before (:each) do
        visit root_path
    end
    scenario "clicking the LFC logo redirects to the LFC website" do
    #click on the logo
    #assert that it redirects to the proper place
    end
    scenario "clicking the home tab redirects to root_path" do
        click_link("Home")
        expect(page.current_path).to eq(root_path)
    end
    scenario "clicking the map tab redirects to the map page" do
        click_link("Map")
        expect(page.current_path).to eq(map_path)
    end
    scenario "clicking the signup tab redirects to /signup" do
        click_link("Sign up")
        expect(page.current_path).to eq(new_farm_path)
    end
    scenario "clikcing the the signin tab redirects to /signin" do
        click_link("Sign In")
        expect(page.current_path).to eq('/signin')
    end
end
