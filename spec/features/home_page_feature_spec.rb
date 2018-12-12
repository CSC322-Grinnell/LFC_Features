require 'rails_helper'

RSpec.feature "the home page appears as expected", :type => :feature do
    before (:each) do
        visit root_path
    end
    scenario "The header appears" do
    expect(page).to have_css('header')
    end
    scenario "the search bar appears" do
    expect(page).to have_css('div.search-bar') 
    #Posssibly not the best way to test that the search bar exists
    end
    scenario "the card-grid appears" do
    expect(page).to have_css ('div.card-grid')
    end
    scenario "the hero appears"do
    expect(page).to have_css('div.hero')
    end
    scenario "the text on the hero is correct" do
    expect(page).to have_content("Search Local Farms")
    end
    scenario "the footer appears" do
    expect(page).to have_css('footer')
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

