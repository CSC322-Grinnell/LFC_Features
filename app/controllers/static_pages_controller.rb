require "google/apis/calendar_v3"

class StaticPagesController < ApplicationController
  def home
  end

  def farmer
  end

  def calendar
    events = Event.all
    recurring_event_ids = Set[]
    @events = []
    @recurring_events = []
    events.each { |item|
      if item.recurring == 0
        @events << item
      elsif item.recurring == 1
        @recurring_events << item
      end
    }
  end
end
