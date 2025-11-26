require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "index renders successfully" do
    get root_path

    assert_response :success
    assert_select 'body'
  end

  test "privacy page renders successfully" do
    get privacy_path

    assert_response :success
    assert_select 'body'
  end

  test "health check returns HTML" do
    get health_path

    assert_response :success
    assert_select 'body'
  end

  test "health check returns JSON with database status" do
    get health_path, as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response.key?("database_connected")
    assert_equal true, json_response["database_connected"]
  end

  test "health check detects database connection" do
    get health_path, as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    # Database should be connected in test environment
    assert json_response["database_connected"], "Database should be connected"
  end
end
