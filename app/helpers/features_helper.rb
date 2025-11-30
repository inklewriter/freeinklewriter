# app/helpers/features_helper.rb
module FeaturesHelper
  def enabled_features
    ENV.keys
       .select { |key| key.start_with?('FEATURE_') && ENV[key] != '0' && ENV[key] != '' }
       .map { |key| key.sub('FEATURE_', '').downcase }
  end
end
