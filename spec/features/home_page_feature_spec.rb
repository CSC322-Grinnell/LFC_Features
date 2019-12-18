require 'rails_helper'

describe "Home Page Features", :type => :feature, js: true do
  before (:each) do
    #create farm in the Farm dataabase
    f1 = Farm.create!(name: "Test Farm CSA", 
                        address: "2039 N. Penrose Street. Grinnell, IA 50112",
                        phone: '641-990-6832',
                        email: 'test1@example.com',
                        password: 'password',
                        approved: true
    )
    f2 = Farm.create!(name: "Test Farm IDE", 
                        address: "1115 S. Main Street. Grinnell, IA 50112",
                        phone: '641-888-7943',
                        email: 'test2@example.com',
                        password: 'password',
                        url: "http://www.beefforyourfreezer.com",
                        approved: true
    )
    #create produce in the Operation database
    Operation.create!(food: "carrot")
    Operation.create!(food: "hay")
    
    #associate farms with produces in the FarmsOperation database
    FarmsOperation.create!(farm_id: 1, operation_id: 1)
    FarmsOperation.create!(farm_id: 2, operation_id: 2)

    visit '/'
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
      expect(page).to have_content("Search Local Food Providers")
    end
    
    scenario "should contain the footer" do
      expect(page).to have_css('footer')
    end

    scenario "should contain the farm cards" do
      #farm id starts from 1, 0 is reserved for admin
      #page should contain two cards, corresponding to the two test farms
      expect(page).to have_css('div#farm_1.card')
      expect(page).to have_css('div#farm_2.card')
    end
  end

  context "farm cards should have proper information" do
    scenario "should contain farms' names" do
      expect(page).to have_content('Test Farm CSA')
      expect(page).to have_content('Test Farm IDE')
    end

    scenario "should contain farms' phone numbers" do
      expect(page).to have_content('641-990-6832')
      expect(page).to have_content('641-888-7943')
    end

    scenario "should contain farms' addresses" do
      expect(page).to have_content('2039 N. Penrose Street. Grinnell, IA 50112')
      expect(page).to have_content('1115 S. Main Street. Grinnell, IA 50112')
    end

    scenario "should contain link to farm if user provides it" do
      expect(page).to have_link('http://www.beefforyourfreezer.com')
    end
  end
  
  context "the home page responds as expected" do
    before :each do
      visit '/'
    end

    scenario "the search bar should filter the cards based on farm name", js: true do
      #fill in some stuff
      fill_in "search-text-home" , :with => "CSA"
      click_button('search-button-home')
      #assert that it presents the farm with the searched name and eliminates the other farm
      expect(page).to have_content('Test Farm CSA')
      expect(page).to_not have_content('Test Farm IDE')

      fill_in "search-text-home" , :with => "IDE"
      click_button('search-button-home')
      expect(page).to have_content('Test Farm IDE')
      expect(page).to_not have_content('Test Farm CSA')
    end

    scenario "the search bar should filter the cards based on produce" do
      #fill in produce name
      fill_in "search-text-home" , :with => "carrot"
      click_button('search-button-home')
      #assert that it presents the farm that grows the searched produce and eliminates the farm that doesn't
      expect(page).to have_content('Test Farm CSA')
      expect(page).to_not have_content('Test Farm IDE')

      fill_in "search-text-home" , :with => "hay"
      click_button('search-button-home')
      expect(page).to have_content('Test Farm IDE')
      expect(page).to_not have_content('Test Farm CSA')
    end
    
    scenario "clicking on a card should link to the farmer's page" do
      #click on a card
      page.find('#farm_1').click
      #assert that it redirects to the proper path and has information not displayed on the home page
      expect(page).to have_content('test1@example.com')
      expect(page).to have_content('carrot')

      visit '/'
      page.find('#farm_2').click
      expect(page).to have_content('test2@example.com')
      expect(page).to have_content('hay')
    end
  end
end
