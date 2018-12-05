require 'rails_helper'

RSpec.feature "the footer appears as expected", :type => :feature do
    scenario "the email appears" do
    #assert that "INFO@LOCALFOODSCONNECTION.COM" is on page
    end
    scenario "the phone number appears" do
    #assert that (641) 990-0018 is on page
    end
    scenario "the link to the instagram appears" do
    #assert that a link to https://www.instagram.com/localfoodsconnection/
    #is present
    end
    scenario "the link to the email appears" do
    # assert that a link mailto:info@localfoodsconnection.com appears
    end
    scenario "the link to the facebook appears" do
    # assert that https://www.facebook.com/LocalFoodsConnection/ is present
    end
    
    
end

RSpec.feature "the footer responds as expected", :type => :feature do
    
end
