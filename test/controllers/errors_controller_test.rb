require 'test_helper'

class ErrorsControllerTest < ActionDispatch::IntegrationTest
  test "not_found page renders" do
    get '/404'

    # In test environment, may return 200 with error page content
    assert_response :success
    assert_select 'body'
  end

  test "internal_server_error page renders" do
    get '/500'

    # In test environment, may return 200 with error page content
    assert_response :success
    assert_select 'body'
  end
end
