require 'rails_helper'

RSpec.describe Event, type: :model do
  before :each do
    event_params = {event_name: 'Farmers Market', time: 'Every Saturday', location: 'Downtown Grinnell', recurring: 1, summary: "Explore local foods!"}
    @testEvent = Event.create!(event_params)
  end
  
  describe "new" do
    it "should return an event object" do
      expect(@testEvent).to be_an_instance_of Event
    end

    it "should contain the correct fields" do
      expect(@testEvent.event_name).to eq('Farmers Market')
      expect(@testEvent.time).to eq('Every Saturday')
      expect(@testEvent.location).to eq('Downtown Grinnell')
      expect(@testEvent.recurring).to eq(1)
      expect(@testEvent.summary).to eq('Explore local foods!')
    end
  end
  
end

