require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # Validation tests
  test "should not save user without email" do
    user = User.new(password: "password123")
    assert_not user.save, "Saved user without email"
  end

  test "should not save user with invalid email format" do
    user = User.new(email: "notanemail", password: "password123")
    assert_not user.save, "Saved user with invalid email format"
  end

  test "should not save user with email missing @" do
    user = User.new(email: "missingat.com", password: "password123")
    assert_not user.save, "Saved user with email missing @"
  end

  test "should not save user with email missing domain" do
    user = User.new(email: "missing@", password: "password123")
    assert_not user.save, "Saved user with email missing domain"
  end

  test "should save user with valid email and password" do
    user = User.new(email: "valid@example.com", password: "password123")
    assert user.save, "Failed to save valid user"
  end

  test "should save user with @inklewriter special domain (historical)" do
    user = User.new(email: "user@inklewriter", password: "password123")
    assert user.save, "Failed to save user with @inklewriter domain"
  end

  test "should not save duplicate email" do
    # Use existing fixture user email
    existing_user = users(:one)
    user2 = User.new(email: existing_user.email, password: "password456")
    assert_not user2.save, "Saved user with duplicate email"
  end

  # Association tests
  test "user has many stories" do
    user = users(:one)
    assert_respond_to user, :stories
  end

  test "user has one admin" do
    user = users(:admin_user)
    assert_respond_to user, :admin
  end

  test "destroying user destroys associated stories" do
    user = users(:one)
    initial_story_count = user.stories.count
    story = user.stories.create(
      title: "Test Story",
      data: {
        "stitches" => { "test" => { "content" => ["test"] } },
        "initial" => "test",
        "editorData" => { "authorName" => "Test Author" }
      }
    )
    story_id = story.id

    # Should destroy all user stories (initial + new one)
    assert_difference('Story.count', -(initial_story_count + 1)) do
      user.destroy
    end

    assert_nil Story.find_by(id: story_id)
  end

  test "destroying user destroys associated admin" do
    user = users(:admin_user)
    admin = admins(:one)  # Use existing admin fixture
    admin_id = admin.id

    assert_difference('Admin.count', -1) do
      user.destroy
    end

    assert_nil Admin.find_by(id: admin_id)
  end

  # Device functionality tests
  test "user password is encrypted" do
    user = User.create(email: "encrypted@example.com", password: "password123")
    assert_not_equal "password123", user.encrypted_password
    assert user.encrypted_password.present?
  end

  test "user can authenticate with valid password" do
    user = User.create(email: "auth@example.com", password: "password123")
    assert user.valid_password?("password123")
  end

  test "user cannot authenticate with invalid password" do
    user = User.create(email: "auth@example.com", password: "password123")
    assert_not user.valid_password?("wrongpassword")
  end

  test "authentication token exists" do
    user = users(:one)
    assert_respond_to user, :authentication_token
  end
end
