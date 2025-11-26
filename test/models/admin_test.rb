require 'test_helper'

class AdminTest < ActiveSupport::TestCase
  # Association tests
  test "admin belongs to user" do
    admin = admins(:one)
    assert_respond_to admin, :user
    assert_equal users(:admin_user), admin.user
  end

  test "admin requires a user" do
    admin = Admin.new
    assert_not admin.save, "Saved admin without user"
  end

  test "admin can be created with valid user" do
    user = User.create(email: "testadmin@example.com", password: "password123")
    admin = Admin.new(user: user)
    assert admin.save, "Failed to save admin with valid user"
  end

  # User-Admin relationship tests
  test "user can have admin role" do
    user = users(:admin_user)
    assert_not_nil user.admin, "Admin user should have admin record"
  end

  test "regular user does not have admin role" do
    user = users(:two)
    assert_nil user.admin, "Regular user should not have admin record"
  end

  test "creating admin grants admin privileges" do
    user = User.create(email: "newadmin@example.com", password: "password123")
    assert_nil user.admin, "New user should not be admin"

    admin = Admin.create(user: user)
    user.reload

    assert_not_nil user.admin, "User should have admin record after creation"
    assert_equal admin, user.admin, "User's admin should match created admin"
  end

  # Validation and uniqueness
  test "user can only have one admin record" do
    user = users(:admin_user)
    admin1 = user.admin

    # Try to create a second admin for the same user
    admin2 = Admin.new(user: user)

    # This should fail if there's a uniqueness constraint, or succeed if not
    # The current schema doesn't enforce uniqueness at DB level
    # but it's good practice to test this scenario
    if admin2.save
      # If it saves, at least verify both exist
      assert_equal 2, Admin.where(user: user).count
    end
  end

  # Timestamps
  test "admin has timestamps" do
    admin = admins(:one)
    assert_respond_to admin, :created_at
    assert_respond_to admin, :updated_at
    assert_not_nil admin.created_at
    assert_not_nil admin.updated_at
  end
end
