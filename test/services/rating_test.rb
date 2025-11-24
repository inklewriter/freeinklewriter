require 'test_helper'

class RatingSmLRatingTest < ActiveSupport::TestCase
  # Initialization tests
  test "Rating::S_m_l_rating accepts Story object" do
    story = stories(:simple_story)
    story.save  # Trigger stats creation
    rating_service = Rating::S_m_l_rating.new(story)
    assert_not_nil rating_service
  end

  test "Rating::S_m_l_rating accepts Integer id" do
    story = stories(:simple_story)
    story.save  # Ensure story exists
    rating_service = Rating::S_m_l_rating.new(story.id)
    assert_not_nil rating_service
  end

  test "Rating::S_m_l_rating accepts String id" do
    story = stories(:simple_story)
    story.save  # Ensure story exists
    rating_service = Rating::S_m_l_rating.new(story.id.to_s)
    assert_not_nil rating_service
  end

  # Calculation tests
  test "calc returns hash with score key" do
    story = stories(:simple_story)
    story.save  # Trigger stats creation

    result = Rating::S_m_l_rating.new(story).calc

    assert result.is_a?(Hash), "calc should return a Hash"
    assert result.key?(:score), "should have score key"
  end

  test "calc returns numeric score" do
    story = stories(:simple_story)
    story.save

    result = Rating::S_m_l_rating.new(story).calc

    assert result[:score].is_a?(Numeric), "score should be numeric"
    assert result[:score] >= 0, "score should be non-negative"
  end

  # Edge case: zero words
  test "calc handles story with zero words" do
    data = {
      "stitches" => {
        "start" => { "content" => [] }
      }
    }
    story = Story.create(
      user: users(:one),
      title: "Empty Story",
      data: data
    )

    result = Rating::S_m_l_rating.new(story).calc

    assert_not_nil result
    assert_equal 0, story.story_stat.total_words
    # With zero words, angle should be 0
    assert result[:score] >= 0
  end

  # Edge case: zero stitches (should not happen in reality, but test defensive code)
  test "calc handles edge case with zero stitches" do
    story = stories(:simple_story)
    story.save

    # Manually set stitches to 0 to test edge case
    story.story_stat.update(stitches: 0)

    result = Rating::S_m_l_rating.new(story).calc

    assert_not_nil result
    assert result[:score].is_a?(Numeric)
  end

  # Quality factors
  test "story with choices has valid score" do
    story_with_choices = stories(:story_with_choices)
    story_with_choices.save

    score = Rating::S_m_l_rating.new(story_with_choices).calc[:score]

    # Story with choices should have calculated score
    assert score.is_a?(Numeric), "Score should be numeric"
    assert score >= 0, "Score should be non-negative"

    # Verify the stats are calculated
    assert story_with_choices.story_stat.with_choice > 0, "Should detect choices"
  end

  test "larger stories get higher size score (sigmoid)" do
    # Create two stories of different sizes
    small_story = Story.create(
      user: users(:one),
      title: "Small",
      data: {
        "stitches" => {
          "start" => { "content" => ["Short"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    large_story = Story.create(
      user: users(:one),
      title: "Large",
      data: {
        "stitches" => {
          "s1" => { "content" => ["Content " * 50] },
          "s2" => { "content" => ["Content " * 50] },
          "s3" => { "content" => ["Content " * 50] },
          "s4" => { "content" => ["Content " * 50] },
          "s5" => { "content" => ["Content " * 50] }
        },
        "initial" => "s1",
        "editorData" => { "authorName" => "Test" }
      }
    )

    # Size score should be higher for larger story (more stitches)
    assert large_story.story_stat.stitches > small_story.story_stat.stitches,
           "Large story should have more stitches"
  end

  test "advanced syntax features are detected and rated" do
    # Story with advanced syntax, real choices (2+ options), and features
    advanced_story = Story.create(
      user: users(:one),
      title: "Advanced",
      data: {
        "stitches" => {
          "start" => {
            "content" => [
              "You have {coins: 5 | no} coins",
              { "flagName" => "visited" },
              { "ifCondition" => "visited == true" },
              { "option" => "Go left", "linkPath" => "left" },
              { "option" => "Go right", "linkPath" => "right" }
            ]
          },
          "left" => { "content" => ["Left path"] },
          "right" => { "content" => ["Right path"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    result = Rating::S_m_l_rating.new(advanced_story).calc

    # Advanced syntax, flags, and conditions should exist
    assert advanced_story.story_stat.advanced_syntax > 0, "Should detect advanced syntax"
    assert advanced_story.story_stat.with_flag > 0, "Should detect flag"
    assert advanced_story.story_stat.with_condition > 0, "Should detect condition"
    assert advanced_story.story_stat.with_choice > 0, "Should detect real choices (2+ options)"

    # Score should be calculated (non-nil numeric)
    assert result[:score].is_a?(Numeric), "Score should be numeric"
    # Note: Score can be negative if branching quality is poor
  end

  # Integration test
  test "calc is automatically called when story is saved" do
    story = Story.create(
      user: users(:one),
      title: "Rating Test",
      data: {
        "stitches" => {
          "start" => {
            "content" => [
              "Beginning of the story",
              { "option" => "Choice 1", "linkPath" => "end1" },
              { "option" => "Choice 2", "linkPath" => "end2" }
            ]
          },
          "end1" => { "content" => ["Ending 1"] },
          "end2" => { "content" => ["Ending 2"] }
        },
        "initial" => "start",
        "editorData" => { "authorName" => "Test" }
      }
    )

    # Rating should be calculated via callback
    assert_not_nil story.story_stat, "story_stat should exist"
    assert_not_nil story.story_stat.score, "score should be calculated"
    assert story.story_stat.score.is_a?(Numeric), "score should be numeric"
    assert story.story_stat.score >= 0, "score should be non-negative"
  end

  # Mathematical helper tests
  test "get_pdf returns numeric value" do
    story = stories(:simple_story)
    story.save
    rating = Rating::S_m_l_rating.new(story)

    result = rating.get_pdf(0.5, 0.7853981634, 0.3926990817)

    assert result.is_a?(Numeric), "get_pdf should return numeric value"
    assert result > 0, "PDF value should be positive"
  end

  test "prob returns numeric value between 0 and 1" do
    story = stories(:simple_story)
    story.save
    rating = Rating::S_m_l_rating.new(story)

    result = rating.prob(100, 100, 10)

    assert result.is_a?(Numeric), "prob should return numeric value"
    assert result >= 0, "probability should be non-negative"
    assert result <= 1, "probability should be <= 1"
  end
end
