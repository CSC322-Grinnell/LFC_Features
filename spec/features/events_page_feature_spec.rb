require 'rails_helper'

RSpec.feature "Events Page Features", :type => :feature do
  before (:each) do
    event_params = {event_name: 'Farmers Market', time: 'Every Saturday', location: 'Downtown Grinnell', recurring: 1, summary: "Explore local foods!"}
    @testEvent = Event.create!(event_params)
    visit '/calendar'
  end

  context "events elements are present" do
    scenario "should contain the name" do
      expect(page).to have_content('Farmers Market')
    end
    
    scenario "should contain the location" do
      expect(page).to have_content('Downtown Grinnell')
    end

    scenario "should contain the time" do
        expect(page).to have_content('Every Saturday')
    end
  end

end