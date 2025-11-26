require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Freeifwriter
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Rails 7.0 upgrade: Disable fixture foreign key verification for backward compatibility
    # This allows existing fixtures to work without requiring immediate updates
    config.active_record.verify_foreign_keys_for_fixtures = false

    config.action_controller.default_protect_from_forgery = false
    
    # Allow custom 404 500 ...
    config.exceptions_app = self.routes

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.assets.configure do |env|
      env.register_exporter %w(text/css application/javascript image/svg+xml), Sprockets::ExportersPack::BrotliExporter
    end
    
  end
end
