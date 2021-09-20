Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  config.serve_static_assets = false

  # Show full error reports.
  config.consider_all_requests_local = false

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options)
  config.active_storage.service = :local

  # Don't care if the mailer can't send.
  # config.action_mailer.raise_delivery_errors = true

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  config.action_mailer.preview_path = "#{Rails.root}/lib/mailer_previews"

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_deliveries = false
  config.action_mailer.default :charset => "utf-8"

  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

  config.action_mailer.smtp_settings = {
      address: Rails.application.secrets.mailing_address.present? ? Rails.application.secrets.mailing_address : ENV["MAILING_ADDRESS"],
      port: Rails.application.secrets.mailing_port.present? ? Rails.application.secrets.mailing_port : ENV["MAILING_PORT"],
      user_name: Rails.application.secrets.mailing_user.present? ? Rails.application.secrets.mailing_user : ENV["MAILING_USER"], #Your SMTP user
      password: Rails.application.secrets.mailing_password.present? ? Rails.application.secrets.mailing_password : ENV["MAILING_PASSWORD"], #Your SMTP password
      authentication: :login,
      enable_starttls_auto: true,
      ssl: true,
      domain: Rails.application.secrets.mailing_domain.present? ? Rails.application.secrets.mailing_domain : ENV["MAILING_DOMAIN"]
  }

end
