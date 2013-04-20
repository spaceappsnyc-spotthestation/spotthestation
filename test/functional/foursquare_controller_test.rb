require 'test_helper'

class FoursquareControllerTest < ActionController::TestCase
  test "should get redirect" do
    get :redirect
    assert_response :success
  end

  test "should get authenticate" do
    get :authenticate
    assert_response :success
  end

end
