require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Freeifwriter
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2


    config.action_controller.default_protect_from_forgery = false
    
    # Allow custom 404 500 ...
    config.exceptions_app = self.routes

    config.i18n.available_locales = [:en,:fr]
    config.i18n.fallbacks = [I18n.default_locale]
    config.i18n.default_locale = :en

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.assets.configure do |env|
      env.register_exporter %w(text/css application/javascript image/svg+xml), Sprockets::ExportersPack::BrotliExporter
    end
    
  end
end
