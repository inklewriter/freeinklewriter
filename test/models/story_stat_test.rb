require 'test_helper'

class StoryStatTest < ActiveSupport::TestCase
  # Association tests
  test "story_stat belongs to story" do
    story = stories(:simple_story)
    story.save  # Trigger stats creation

    story_stat = story.story_stat
    assert_respond_to story_stat, :story
    assert_equal story, story_stat.story
  end

  test "story_stat can exist without a story" do
    # belongs_to :story, optional: true allows this
    story_stat = StoryStat.new(
      stitches: 5,
      total_words: 100,
      avg_words: 20.0
    )
    assert story_stat.save, "Failed to save story_stat without story"
  end

  # Attribute tests
  test "story_stat has stat attributes" do
    story_stat = StoryStat.new

    # Check that all expected stat attributes exist
    assert_respond_to story_stat, :stitches
    assert_respond_to story_stat, :with_choice
    assert_respond_to story_stat, :with_condition
    assert_respond_to story_stat, :with_flag
    assert_respond_to story_stat, :with_divert
    assert_respond_to story_stat, :with_end
    assert_respond_to story_stat, :with_image
    assert_respond_to story_stat, :with_fake_choice
    assert_respond_to story_stat, :avg_words
    assert_respond_to story_stat, :total_words
    assert_respond_to story_stat, :advanced_syntax
    assert_respond_to story_stat, :score
  end

  test "story_stat can store integer counts" do
    story_stat = StoryStat.create(
      stitches: 10,
      with_choice: 5,
      with_condition: 3,
      with_flag: 2,
      with_divert: 4,
      with_end: 1,
      with_image: 1,
      with_fake_choice: 2,
      total_words: 250,
      advanced_syntax: 3
    )

    assert_equal 10, story_stat.stitches
    assert_equal 5, story_stat.with_choice
    assert_equal 3, story_stat.with_condition
    assert_equal 2, story_stat.with_flag
    assert_equal 4, story_stat.with_divert
    assert_equal 1, story_stat.with_end
    assert_equal 1, story_stat.with_image
    assert_equal 2, story_stat.with_fake_choice
    assert_equal 250, story_stat.total_words
    assert_equal 3, story_stat.advanced_syntax
  end

  test "story_stat can store float values" do
    story_stat = StoryStat.create(
      avg_words: 25.5,
      score: 0.75
    )

    assert_in_delta 25.5, story_stat.avg_words, 0.01
    assert_in_delta 0.75, story_stat.score, 0.01
  end

  # Integration with Story
  test "story_stat is automatically created when story is saved" do
    story = Story.create(
      user: users(:one),
      title: "Auto Stats Story",
      data: {
        "stitches" => {
          "start" => { "content" => ["Beginning"] },
          "middle" => { "content" => ["Middle part"] },
          "end" => { "content" => ["The end"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    assert_not_nil story.story_stat, "story_stat should be automatically created"
    assert story.story_stat.persisted?, "story_stat should be saved to database"
  end

  test "story_stat stitches count matches story" do
    story = Story.create(
      user: users(:one),
      title: "Stitch Count Test",
      data: {
        "stitches" => {
          "one" => { "content" => ["First"] },
          "two" => { "content" => ["Second"] },
          "three" => { "content" => ["Third"] }
        },
        "initial" => "one",
        "editorData" => { "authorName" => "Test" }
      }
    )

    assert_equal 3, story.story_stat.stitches, "stitches count should match story structure"
  end

  test "story_stat calculates total words correctly" do
    story = Story.create(
      user: users(:one),
      title: "Word Count Test",
      data: {
        "stitches" => {
          "start" => { "content" => ["This has five words total"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    assert story.story_stat.total_words > 0, "total_words should be calculated"
  end
end
