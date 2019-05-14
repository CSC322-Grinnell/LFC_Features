require 'rails_helper'

RSpec.feature "Map Features", :type => :feature do
  before (:each) do
    f=Farm.create!(name: "Compass Plant CSA", 
                   address: "2039 N. Penrose Street. Grinnell, IA 50112",
                   url: "aaa",
                   phone: '641-990-6832',
                   email: 'ladunham@wildblue.net',
                   password: 'password',
      )
    f.approved=true
    f.save
    visit '/map'
  end
    
  context "map elements are present" do
    scenario "should contain a google map" do
      find('.farm-map').click(x: 19, y: -123)
      #expect(page).to have_content("info@localfoodsconnection.com")
    end
  end
end
