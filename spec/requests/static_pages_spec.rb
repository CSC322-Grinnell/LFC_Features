require 'rails_helper'

RSpec.describe "StaticPages", type: :request do
  before do
    @base_title = "Local Foods Connection"
  end

  describe "Home Page" do
    it "should have title 'Home | Local Foods Connection'" do
      visit '/'
      expect(page).to have_title("Home | #{@base_title}", exact:true)
    end
  end

  describe "Calendar Page" do
    it "should have title 'Events | Local Foods Connection'" do
      visit '/calendar'
      expect(page).to have_title("Events | #{@base_title}", exact:true)
    end
  end
end
