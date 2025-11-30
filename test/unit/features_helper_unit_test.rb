require "minitest/autorun"
require "climate_control"

# Mock module for testing
module FeaturesHelper
  def enabled_features
    ENV.keys
       .select { |key| key.start_with?('FEATURE_') && ENV[key] != '0' && ENV[key] != '' }
       .map { |key| key.sub('FEATURE_', '').downcase }
  end
end

class FeaturesHelperUnitTest < Minitest::Test
  include FeaturesHelper

  def test_enabled_features_returns_empty_array_when_no_feature_flags_set
    ClimateControl.modify do
      assert_equal [], enabled_features
    end
  end

  def test_enabled_features_returns_feature_when_FEATURE_X_equals_1
    ClimateControl.modify FEATURE_TEST: "1" do
      assert_equal ["test"], enabled_features
    end
  end

  def test_enabled_features_does_not_return_feature_when_FEATURE_X_equals_0
    ClimateControl.modify FEATURE_TEST: "0" do
      assert_equal [], enabled_features
    end
  end

  def test_enabled_features_does_not_return_feature_when_FEATURE_X_is_empty_string
    ClimateControl.modify FEATURE_TEST: "" do
      assert_equal [], enabled_features
    end
  end

  def test_enabled_features_returns_feature_when_FEATURE_X_equals_true
    ClimateControl.modify FEATURE_TEST: "true" do
      assert_equal ["test"], enabled_features
    end
  end

  def test_enabled_features_returns_feature_when_FEATURE_X_equals_yes
    ClimateControl.modify FEATURE_TEST: "yes" do
      assert_equal ["test"], enabled_features
    end
  end

  def test_enabled_features_returns_feature_when_FEATURE_X_has_any_non_zero_value
    ClimateControl.modify FEATURE_TEST: "anything" do
      assert_equal ["test"], enabled_features
    end
  end

  def test_enabled_features_returns_multiple_features
    ClimateControl.modify FEATURE_COMMUNITY_LINK: "1", FEATURE_PASSWORD_RESET: "1" do
      result = enabled_features
      assert_equal 2, result.length
      assert_includes result, "community_link"
      assert_includes result, "password_reset"
    end
  end

  def test_enabled_features_converts_to_lowercase
    ClimateControl.modify FEATURE_COMMUNITY_LINK: "1" do
      assert_equal ["community_link"], enabled_features
    end
  end

  def test_enabled_features_ignores_non_FEATURE_environment_variables
    ClimateControl.modify FEATURE_TEST: "1", OTHER_VAR: "1", RAILS_ENV: "test" do
      assert_equal ["test"], enabled_features
    end
  end

  def test_enabled_features_filters_out_features_set_to_0_among_enabled_ones
    ClimateControl.modify FEATURE_ENABLED: "1", FEATURE_DISABLED: "0", FEATURE_ALSO_ENABLED: "yes" do
      result = enabled_features
      assert_equal 2, result.length
      assert_includes result, "enabled"
      assert_includes result, "also_enabled"
      refute_includes result, "disabled"
    end
  end
end
