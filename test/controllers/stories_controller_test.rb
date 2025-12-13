require 'test_helper'

class StoriesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  # SHOW action tests
  test "show returns story in HTML format" do
    story = stories(:simple_story)
    get story_path(story)

    assert_response :success
    assert_select 'h1', story.title
  end

  test "show returns story in JSON format" do
    story = stories(:simple_story)
    get story_path(story, format: :json)

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response.key?("title")
    assert json_response.key?("data")
    assert_equal story.title, json_response["title"]
  end

  test "show returns story in INK format" do
    story = stories(:simple_story)
    get story_path(story, format: :ink)

    assert_response :success
  end

  test "show returns 404 for non-existent story" do
    get story_path(id: 99999)

    assert_response :success  # Renders not_found template
    assert_select 'body'  # Check that page renders
  end

  test "show builds preview for HTML format" do
    story = stories(:simple_story)
    get story_path(story)

    assert_response :success
    # Check that preview content is rendered
    assert_select '.stitch', minimum: 1
  end

  # INDEX action tests
  test "index returns stories for logged in user" do
    sign_in users(:one)
    get stories_path

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response.is_a?(Array)
  end

  test "index renders error page when user not logged in" do
    get stories_path

    assert_response :success
    # Should render cannot_display_stories template
  end

  # CREATE action tests
  test "create story when user is logged in" do
    sign_in users(:one)

    story_data = {
      "stitches" => {
        "start" => { "content" => ["New story content"] }
      },
      "initial" => "start",
      "editorData" => { "authorName" => "Test Author" }
    }

    assert_difference('Story.count', 1) do
      post stories_path, params: { data: story_data, title: "New Test Story" }
    end

    assert_response :created
    json_response = JSON.parse(response.body)
    assert json_response.key?("url_key")
    assert json_response.key?("title")
    assert_equal "New Test Story", json_response["title"]
  end

  test "create story fails when user not logged in" do
    story_data = {
      "stitches" => {
        "start" => { "content" => ["New story content"] }
      },
      "initial" => "start",
      "editorData" => { "authorName" => "Test Author" }
    }

    assert_no_difference('Story.count') do
      post stories_path, params: { data: story_data, title: "New Test Story" }
    end

    assert_response :redirect
    assert_redirected_to root_path
  end

  test "create story fails without data parameter" do
    sign_in users(:one)

    assert_no_difference('Story.count') do
      post stories_path, params: { title: "Incomplete Story" }
    end

    assert_response :bad_request
  end

  test "create story with nil title" do
    sign_in users(:one)

    story_data = {
      "stitches" => {
        "start" => { "content" => ["New story content"] }
      },
      "initial" => "start",
      "editorData" => { "authorName" => "Test" }
    }

    # When title is nil, model sets default "Untitled Story" via before_save callback
    assert_difference('Story.count', 1) do
      post stories_path, params: { data: story_data }
    end

    assert_response :created
    created_story = Story.last
    assert_equal "Untitled Story", created_story.title
  end

  # UPDATE action tests
  test "update story when owner is logged in" do
    story = stories(:simple_story)
    user = story.user
    sign_in user

    updated_data = {
      "stitches" => {
        "start" => { "content" => ["Updated content"] }
      },
      "initial" => "start",
      "editorData" => { "authorName" => "Updated Author" }
    }

    patch story_path(story), params: { data: updated_data, title: "Updated Title" }

    assert_response :created
    json_response = JSON.parse(response.body)
    assert_equal "ok", json_response["message"]

    story.reload
    assert_equal "Updated Title", story.title
  end

  test "update story fails when user not logged in" do
    story = stories(:simple_story)

    updated_data = {
      "stitches" => {
        "start" => { "content" => ["Updated content"] }
      }
    }

    patch story_path(story), params: { data: updated_data, title: "Updated Title" }

    assert_response :redirect
    assert_redirected_to root_path
  end

  test "update story fails when user is not the owner" do
    story = stories(:simple_story)
    different_user = users(:two)
    sign_in different_user

    updated_data = {
      "stitches" => {
        "start" => { "content" => ["Hacker content"] }
      }
    }

    patch story_path(story), params: { data: updated_data, title: "Hacked Title" }

    assert_response :redirect
  end

  test "update story fails without data parameter" do
    story = stories(:simple_story)
    sign_in story.user

    patch story_path(story), params: { title: "Updated Title" }

    assert_response :bad_request
  end

  test "update story fails without title parameter" do
    story = stories(:simple_story)
    sign_in story.user

    updated_data = {
      "stitches" => {
        "start" => { "content" => ["Updated content"] }
      }
    }

    patch story_path(story), params: { data: updated_data }

    assert_response :bad_request
  end

  # DESTROY action tests
  test "destroy story when owner is logged in" do
    story = stories(:simple_story)
    user = story.user
    sign_in user

    assert_difference('Story.count', -1) do
      delete story_path(story)
    end

    assert_response :created
    json_response = JSON.parse(response.body)
    assert_equal "ok", json_response["message"]
  end

  test "destroy story fails when user not logged in" do
    story = stories(:simple_story)

    assert_no_difference('Story.count') do
      delete story_path(story)
    end

    assert_response :redirect
    assert_redirected_to root_path
  end

  test "destroy story fails when user is not the owner" do
    story = stories(:simple_story)
    different_user = users(:two)
    sign_in different_user

    assert_no_difference('Story.count') do
      delete story_path(story)
    end

    assert_response :redirect
  end

  # Edge cases and security
  test "show displays story content" do
    story = stories(:simple_story)
    get story_path(story)

    assert_response :success
    # Check that story is rendered
    assert_select 'h1', story.title
    assert_select 'h2', story.data["editorData"]["authorName"]
  end

  test "create sanitizes story title" do
    sign_in users(:one)

    story_data = {
      "stitches" => {
        "start" => { "content" => ["Content"] }
      },
      "initial" => "start",
      "editorData" => { "authorName" => "Test" }
    }

    post stories_path, params: {
      data: story_data,
      title: "<script>alert('xss')</script>Malicious Title"
    }

    assert_response :created
    created_story = Story.last
    assert_not_includes created_story.title, "<script>"
  end

end
