require 'test_helper'

class UiControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get ui_home_url
    assert_response :success
  end

end
