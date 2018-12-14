require 'rails_helper'

RSpec.feature "Home Page Features", :type => :feature do
  before (:each) do
    visit root_path
  end
  
  context "home page elements are present" do
    scenario "should contain the header" do
      expect(page).to have_css('header')
    end
    
    scenario "should contain the search bar" do
      expect(page).to have_css('div.search-bar') 
      #possibly not the best way to test that the search bar exists
    end
    
    scenario "should contain the card grid" do
      expect(page).to have_css ('div.card-grid')
    end
    
    scenario "should contain the hero"do
      expect(page).to have_css('div.hero')
    end
    
    scenario "should contain the correct hero text" do
      expect(page).to have_content("Search Local Farms")
    end
    
    scenario "should contain the footer" do
      expect(page).to have_css('footer')
    end
  end
  
  context "the home page responds as expected" do
    scenario "the search bar should filter the cards" do
      #Create a CSA Farm
      f = Farm.create!(name: "Compass Plant CSA", 
                        address: "2039 N. Penrose Street. Grinnell, IA 50112",
                        phone: '641-990-6832',
                        email: 'ladunham@wildblue.net',
                        password: 'password'
      )
      #fill in some stuff
      fill_in "search-text-home" , :with => "CSA"
      #assert that it's what we want
      within(:css, 'div.card-grid') do 
        #expect(page).to have_css('div#farm_6')
        expect(page).to have_content('Compass Plant CSA')
      end
    end
    
    scenario "clicking on a card should link to the farmer's page" do
      #click on a card
      #assert that it redirects to the proper path
    end
  end
end
