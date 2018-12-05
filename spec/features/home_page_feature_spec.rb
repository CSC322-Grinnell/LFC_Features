require 'rails_helper'

RSpec.feature "the home page appears as expected", :type => :feature do
    before (:each) do
        visit root_path
    end
    scenario "The header appears" do
    #Assert that the header is present
    end
    scenario "the search bar appears" do
    #assert that the search bar is present...
    expect(page).to have_content('Search local farms...')
    end
    scenario "the cards appear" do
    # At least one card appears...
    expect(page).to have_content ('Middle Way Farm')
    end
    scenario "the hero image appears"do
    expect(page).to have_css("img[src*='hero.jpg']")
    end
    scenario "the text on the hero is correct" do
    #assert that it says "Search Local Farms"
    expect(page).to have_content("Search Local Farms")
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

