require "google/apis/calendar_v3"

class StaticPagesController < ApplicationController
  def home
  end

  def map
  end

  def eventJson
    # use the gcal api to get a list of events
    service = Google::Apis::CalendarV3::CalendarService.new
    # In c9, environment variables can be set in ~/.bashrc (not the local .bashrc)
    # You can open this file with a command-line text editor like vim
    # at the bottom of the file, add
    # CALENDAR_SERVICE_KEY='AIzaSyDTwsxsAm29xldurqQz4dTWPxcpQUgVl5Y'
    service.key = "AIzaSyDTwsxsAm29xldurqQz4dTWPxcpQUgVl5Y" # ENV["CALENDAR_SERVICE_KEY"]
    calendar_id = "9b4goqj9c9ujv4k4ijfdkeh3n0@group.calendar.google.com" # ENV["CALENDAR_ID"]
    response = service.list_events(
      calendar_id,
      max_results: 10,
      order_by: "startTime",
      single_events: true,
      time_min: DateTime.now.rfc3339,
    )
    @events = []
    response.items.each { |item|
      @events << item
    }
    render json: @events.to_json
  end

  def recipes
  end

  def farmer
  end

  def calendar
    # use the gcal api to get a list of events
    service = Google::Apis::CalendarV3::CalendarService.new
    # In c9, environment variables can be set in ~/.bashrc (not the local .bashrc)
    # You can open this file with a command-line text editor like vim
    # at the bottom of the file, add
    # CALENDAR_SERVICE_KEY='AIzaSyDTwsxsAm29xldurqQz4dTWPxcpQUgVl5Y'
    service.key = "AIzaSyDTwsxsAm29xldurqQz4dTWPxcpQUgVl5Y" # ENV["CALENDAR_SERVICE_KEY"]
    calendar_id = "9b4goqj9c9ujv4k4ijfdkeh3n0@group.calendar.google.com" # ENV["CALENDAR_ID"]
    response = service.list_events(
      calendar_id,
      max_results: 10,
      order_by: "startTime",
      single_events: true,
      time_min: DateTime.now.rfc3339,
    )
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
