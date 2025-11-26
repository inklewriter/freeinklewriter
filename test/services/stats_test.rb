require 'test_helper'

class StatsStoryTest < ActiveSupport::TestCase
  # Initialization tests
  test "Stats::Story accepts Story object" do
    story = stories(:simple_story)
    stats_service = Stats::Story.new(story)
    assert_not_nil stats_service
  end

  test "Stats::Story accepts Integer id" do
    story = stories(:simple_story)
    stats_service = Stats::Story.new(story.id)
    assert_not_nil stats_service
  end

  test "Stats::Story accepts String id" do
    story = stories(:simple_story)
    stats_service = Stats::Story.new(story.id.to_s)
    assert_not_nil stats_service
  end

  test "Stats::Story accepts Hash data" do
    data = {
      "stitches" => {
        "start" => { "content" => ["Test content"] }
      }
    }
    stats_service = Stats::Story.new(data)
    assert_not_nil stats_service
  end

  # Basic stats calculation
  test "stats returns hash with expected keys" do
    story = stories(:simple_story)
    stats = Stats::Story.new(story).stats

    assert stats.is_a?(Hash), "stats should return a Hash"
    assert stats.key?(:stitches), "should have stitches key"
    assert stats.key?(:total_words), "should have total_words key"
    assert stats.key?(:avg_words), "should have avg_words key"
    assert stats.key?(:with_choice), "should have with_choice key"
    assert stats.key?(:with_condition), "should have with_condition key"
    assert stats.key?(:with_flag), "should have with_flag key"
    assert stats.key?(:with_divert), "should have with_divert key"
    assert stats.key?(:with_end), "should have with_end key"
    assert stats.key?(:with_image), "should have with_image key"
    assert stats.key?(:with_fake_choice), "should have with_fake_choice key"
    assert stats.key?(:advanced_syntax), "should have advanced_syntax key"
  end

  # Stitch counting
  test "counts stitches correctly" do
    story = stories(:simple_story)
    stats = Stats::Story.new(story).stats

    expected_stitches = story.data["stitches"].keys.count
    assert_equal expected_stitches, stats[:stitches], "should count all stitches"
  end

  # Word counting
  test "counts total words" do
    story = stories(:simple_story)
    stats = Stats::Story.new(story).stats

    assert stats[:total_words] > 0, "should count words in content"
  end

  test "calculates average words per stitch" do
    story = stories(:simple_story)
    stats = Stats::Story.new(story).stats

    if stats[:stitches] > 0
      expected_avg = stats[:total_words] / stats[:stitches]
      assert_equal expected_avg, stats[:avg_words], "avg_words should be total_words / stitches"
    end
  end

  # Choice detection
  test "detects real choices (2+ options)" do
    story = stories(:story_with_choices)
    stats = Stats::Story.new(story).stats

    # story_with_choices has a stitch with 2 options
    assert stats[:with_choice] >= 1, "should detect stitches with multiple choices"
  end

  test "detects fake choices (1 option)" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Text",
            { "option" => "Only choice", "linkPath" => "next" }
          ]
        },
        "next" => { "content" => ["More text"] }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:with_fake_choice], "should detect fake choice (single option)"
  end

  # Divert detection
  test "detects diverts" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Text",
            { "divert" => "next" }
          ]
        },
        "next" => { "content" => ["More text"] }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:with_divert], "should detect stitches with diverts"
  end

  # End detection
  test "detects endings (no choices or diverts)" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Start",
            { "option" => "Go", "linkPath" => "end" }
          ]
        },
        "end" => { "content" => ["The end"] }
      }
    }
    stats = Stats::Story.new(data).stats

    assert stats[:with_end] >= 1, "should detect stitches that are endings"
  end

  # Condition detection
  test "detects ifCondition" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Text",
            { "ifCondition" => "flag = true" }
          ]
        }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:with_condition], "should detect ifCondition"
  end

  # Flag detection
  test "detects flags" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Text",
            { "flagName" => "visited" }
          ]
        }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:with_flag], "should detect flag usage"
  end

  # Image detection
  test "detects images" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Text",
            { "image" => "https://example.com/image.png" }
          ]
        }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:with_image], "should detect image usage"
  end

  # Advanced syntax detection
  test "detects advanced syntax with curly braces" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "You have {coins: 5 | no} coins"
          ]
        }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:advanced_syntax], "should detect {x:y} syntax"
  end

  test "detects advanced syntax with square brackets" do
    data = {
      "stitches" => {
        "start" => {
          "content" => [
            "Link to [url: example.com]"
          ]
        }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 1, stats[:advanced_syntax], "should detect [x:y] syntax"
  end

  # Edge cases
  test "handles story with no words" do
    data = {
      "stitches" => {
        "start" => { "content" => [] }
      }
    }
    stats = Stats::Story.new(data).stats

    assert_equal 0, stats[:total_words], "should handle empty content"
    assert_equal 0, stats[:avg_words], "avg should be 0 when no words"
  end

  test "handles invalid story gracefully" do
    stats = Stats::Story.new(nil).stats
    assert_nil stats, "should return nil for invalid input"
  end
end
