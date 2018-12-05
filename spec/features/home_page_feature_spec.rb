require 'rails_helper'

RSpec.feature "the home page appears as expected", :type => :feature do
    before (:each) do
        visit root_path
    end
    
    scenario "the search bar appears" do
    page.should have_content('Search local farms...')
    end
    scenario "the cards appear" do
    #assert that there is at least one card present
    end
    scenario "the hero image appears"do
    #assert that the hero is present
    end
    scenario "the text on the hero is correct" do
    #assert that it says "Search Local Farms"
    end
    scenario "the footer appears" do
    #assert that the footer is present
    end
end

RSpec.feature "the home page responds as expected", :type => :feature do

 before (:each) do
        visit root_path
    end
    
    scenario "the search bar filters the cards" do
    #fill in some stuff
    #assert that it's what we want
    end
    scenario "clicking on a card links to the farmer's page" do
    #click on a card
    #assert that it redirects to the proper path
    end
    
end

