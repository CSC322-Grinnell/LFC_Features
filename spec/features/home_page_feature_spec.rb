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
    before do
      f1 = Farm.create!(name: "Test Farm CSA", 
                        address: "2039 N. Penrose Street. Grinnell, IA 50112",
                        phone: '641-990-6832',
                        email: 'test1@example.com',
                        password: 'password'
      )

      f2 = Farm.create!(name: "Test Farm IDE", 
                        address: "1115 S. Penrose Street. Grinnell, IA 50112",
                        phone: '641-990-6832',
                        email: 'test2@example.com',
                        password: 'password'
      )

      Operation.create!(food: "carrot")
      Operation.create!(food: "hay")
      
      FarmsOperation.create!(farm_id: 0, operation_id: 3)
      FarmsOperation.create!(farm_id: 1, operation_id: 11)
    end
    
    scenario "the search bar should filter the cards based on farm name" do
      #fill in some stuff
      fill_in "search-text-home" , :with => "CSA"
      #assert that it's what we want
      within(:css, 'div.card-grid') do 
        expect(page).to have_content('Test Farm CSA')
      end
    end

    scenario "the search bar should filter the cards based on produce" do
      #fill in some stuff
      fill_in "search-text-home" , :with => "carrots"
      #assert that it's what we want
      within(:css, 'div.card-grid') do 
        expect(page).to have_content('Test Farm CSA')
      end

      #fill in some stuff
      fill_in "search-text-home" , :with => "hay"
      #assert that it's what we want
      within(:css, 'div.card-grid') do 
        expect(page).to have_content('Test Farm IDE')
      end
    end
    
    scenario "clicking on a card should link to the farmer's page" do
      click_link 'farm_0'
      #click on a card
      #assert that it redirects to the proper path
      expect(page).to have_content('test@example.com')
    end
  end
end
