require 'rails_helper'

RSpec.feature "the header appears as expected", :type => :feature do
    scenario "the LFC logo is present" do
    #assert that the logo appears
    end
    scenario "the home tab appears" do
    end
    scenario "the map tab appears" do
    end
    scenario "the signup tab appears" do
    end
    scenario "the signin tab appears" do
    end

end

RSpec.feature "the header responds as expected", :type => :feature do
    scenario "clicking the LFC logo redirects to the LFC website" do
    #click on the logo
    #assert that it redirects to the proper place
    end
    scenario "clicking the home tab redirects to root_path" do
    end
    scenario "clicking the map tab redirects to the map page" do
    end
    scenario "clicking the signup tab redirects to /signup" do
    end
    scenario "clikcing the the signin tab redirects to /signin" do
    end
end
