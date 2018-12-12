require 'rails_helper'

RSpec.feature "the footer appears as expected", :type => :feature do
    before (:each) do
        visit root_path
    end
    scenario "the email appears" do
        expect(page).to have_content("info@localfoodsconnection.com")
    end
    scenario "the phone number appears" do
        expect(page).to have_content("(641) 990-0018")
    end
    scenario "the link to the instagram appears" do
        expect(page).to have_selector(:css, 'a[href="https://www.instagram.com/localfoodsconnection/"]')
    end
    scenario "the link to the email appears" do
        expect(page).to have_selector(:css, 'a[href="mailto:info@localfoodsconnection.com"]')
    end
    scenario "the link to the facebook appears" do
        expect(page).to have_selector(:css, 'a[href="https://www.facebook.com/LocalFoodsConnection/"]')
    end
    
    
end

RSpec.feature "the footer responds as expected", :type => :feature do
    
end
