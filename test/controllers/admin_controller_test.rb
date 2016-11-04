require 'test_helper'

class AdminControllerTest < ActionDispatch::IntegrationTest
  test "should get tools" do
    get admin_tools_url
    assert_response :success
  end

end
