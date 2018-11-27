require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @base_title = "Local Foods Connection"
  end


  test "should get home" do
    get static_pages_home_url
    assert_response :success
    assert_select "title", "Home | #{@base_title}"
  end

    test "should get map" do
    get static_pages_map_url
    assert_response :success
    assert_select "title", "Map | #{@base_title}"
  end

end
