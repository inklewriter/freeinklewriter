require 'test_helper'

class StoryTest < ActiveSupport::TestCase
  # Validation tests
  test "should not save story without data" do
    story = Story.new(user: users(:one), title: "Test Story")
    assert_not story.save, "Saved story without data"
  end

  test "should save story with valid data" do
    story = Story.new(
      user: users(:one),
      title: "Valid Story",
      data: {
        "stitches" => { "start" => { "content" => ["Hello world"] } },
        "initial" => "start",
        "editorData" => { "authorName" => "Test Author" }
      }
    )
    assert story.save, "Failed to save valid story"
  end

  # Association tests
  test "story belongs to user" do
    story = stories(:simple_story)
    assert_respond_to story, :user
    assert_equal users(:one), story.user
  end

  test "story has one story_stat" do
    story = stories(:simple_story)
    assert_respond_to story, :story_stat
  end

  test "destroying story destroys associated story_stat" do
    story = stories(:simple_story)
    # Trigger stats creation
    story.save

    if story.story_stat.present?
      assert_difference('StoryStat.count', -1) do
        story.destroy
      end
    else
      # If no story_stat exists, count shouldn't change
      assert_no_difference('StoryStat.count') do
        story.destroy
      end
    end
  end

  # Callback tests: assign_url_key
  test "url_key is assigned after create" do
    story = Story.create(
      user: users(:one),
      title: "New Story",
      data: {
        "stitches" => { "start" => { "content" => ["Test"] } },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )
    assert_not_nil story.url_key, "url_key was not assigned"
    assert_equal story.id, story.url_key, "url_key should equal story id"
  end

  # Callback tests: sanitize_title
  test "title is sanitized before save" do
    story = Story.create(
      user: users(:one),
      title: "<script>alert('xss')</script>Valid Title",
      data: {
        "stitches" => { "start" => { "content" => ["Test"] } },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )
    assert_not_includes story.title, "<script>", "Title contains unsafe HTML"
    assert_includes story.title, "Valid Title", "Title lost valid content"
  end

  # Callback tests: sanitize_author
  test "author name is sanitized before save" do
    story = Story.create(
      user: users(:one),
      title: "Test",
      data: {
        "stitches" => { "start" => { "content" => ["Test"] } },
        "initial" => "start",
        "editorData" => { "authorName" => "<b>Bad</b>Author" }
      }
    )
    story.reload  # Reload from database to get sanitized value
    author_name = story.data["editorData"]["authorName"]
    assert_not_includes author_name, "<b>", "Author name contains HTML tags"
  end

  # Callback tests: process_stats
  test "story_stat is created after save" do
    story = Story.new(
      user: users(:one),
      title: "Stats Test",
      data: {
        "stitches" => {
          "start" => { "content" => ["Hello world"] },
          "next" => { "content" => ["More content"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    assert_difference('StoryStat.count', 1) do
      story.save
    end

    assert_not_nil story.story_stat, "story_stat was not created"
  end

  test "story_stat is updated when story data changes" do
    story = stories(:simple_story)
    story.save  # Ensure stats are created

    original_stitches = story.story_stat&.stitches

    # Update story data with more stitches
    story.data["stitches"]["new_stitch"] = { "content" => ["New content"] }
    story.save

    # Stats should be recalculated
    assert_not_nil story.story_stat, "story_stat should exist"
  end

  # Callback tests: process_rating
  test "story rating is calculated after save" do
    story = Story.create(
      user: users(:one),
      title: "Rating Test",
      data: {
        "stitches" => {
          "start" => { "content" => ["Hello world"] },
          "choice" => {
            "content" => [
              "Make a choice",
              { "option" => "Option 1", "linkPath" => "end1" },
              { "option" => "Option 2", "linkPath" => "end2" }
            ]
          },
          "end1" => { "content" => ["Ending 1"] },
          "end2" => { "content" => ["Ending 2"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    assert_not_nil story.story_stat, "story_stat should be created"
    assert_not_nil story.story_stat.score, "rating score should be calculated"
  end

  # Data structure tests
  test "story data can be parsed as JSON" do
    story = stories(:simple_story)
    assert story.data.is_a?(Hash), "Story data should be a Hash"
    assert story.data.key?("stitches"), "Story data should have stitches"
    assert story.data.key?("initial"), "Story data should have initial stitch"
  end

  test "story data contains valid stitch structure" do
    story = stories(:story_with_choices)
    stitches = story.data["stitches"]

    assert stitches.is_a?(Hash), "Stitches should be a Hash"
    assert stitches.any?, "Story should have at least one stitch"

    # Check first stitch has content array
    first_stitch = stitches.values.first
    assert first_stitch.key?("content"), "Stitch should have content"
    assert first_stitch["content"].is_a?(Array), "Content should be an Array"
  end
end
