require 'google/apis/calendar_v3'

class StaticPagesController < ApplicationController
  def view2
  end

  def map
  end
  
  def recipes
  end
  
  def farmer
  end
  
  def calendar
    # use the gcal api to get a list of events
    service = Google::Apis::CalendarV3::CalendarService.new
    service.key = 'AIzaSyB3dKTdTXm8cHunIBQxmmI8iJFpBYMWe_0'
    calendar_id = 'bhb4fo8f3urm5j83m8tjn60klo@group.calendar.google.com'
    response = service.list_events(
      calendar_id,
      max_results: 10,
      order_by: 'startTime',
      single_events: true,
      time_min: DateTime.now.rfc3339)
    # sort the events into recurring and one-time events
    # recurring_event_ids keeps track of the ids we have already seen so that
    # we can avoid dupication
    recurring_event_ids = Set[]
    @events = []
    @recurring_events = []
    response.items.each { |item|
      if item.recurring_event_id.nil?
        @events << item
      elsif !recurring_event_ids.include? item.recurring_event_id
        recurring_event_ids << item.recurring_event_id
        @recurring_events << item
      end
    }
  end
end
