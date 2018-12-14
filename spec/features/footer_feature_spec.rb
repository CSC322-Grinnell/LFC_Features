require 'rails_helper'

RSpec.feature "Footer Features", :type => :feature do
  before (:each) do
    visit root_path
  end
    
  context "footer elements are present" do
    scenario "should contain the site's email" do
      expect(page).to have_content("info@localfoodsconnection.com")
    end
    
    scenario "should contain the phone number" do
      expect(page).to have_content("(641) 990-0018")
    end
    
    scenario "should contain the instagram link" do
      expect(page).to have_selector(:css, 'a[href="https://www.instagram.com/localfoodsconnection/"]')
    end
    
    scenario "should contain a link to the site's email" do
      expect(page).to have_selector(:css, 'a[href="mailto:info@localfoodsconnection.com"]')
    end
    
    scenario "should contain the facebook link" do
      expect(page).to have_selector(:css, 'a[href="https://www.facebook.com/LocalFoodsConnection/"]')
    end
  end
end
