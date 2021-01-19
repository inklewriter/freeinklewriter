# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets')


# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( ifwriter-main.js )
Rails.application.config.assets.precompile += %w( pages/index.js )
Rails.application.config.assets.precompile += %w( stories/show.js )
Rails.application.config.assets.precompile += %w( emails.css )
Rails.application.config.assets.precompile += %w( devise.css )
Rails.application.config.assets.precompile += %w( errors.css )
Rails.application.config.assets.precompile += %w( inklewriter-convert.js )
Rails.application.config.assets.precompile += %w( inking.css )
Rails.application.config.assets.precompile += %w( inklewriter-read.js )
Rails.application.config.assets.precompile += %w( inklewriter-write.js )
Rails.application.config.assets.precompile += %w( pages.css )
Rails.application.config.assets.precompile += %w( inking.css )
Rails.application.config.assets.precompile += %w( stories.css )
Rails.application.config.assets.precompile += %w( inklewriter.css )
Rails.application.config.assets.precompile += %w( admin/adminpages.css )
Rails.application.config.assets.precompile += %w( users/confirmations.css )
Rails.application.config.assets.precompile += %w( users/sessions.css )
Rails.application.config.assets.precompile += %w( users/registrations.css )
Rails.application.config.assets.precompile += %w( users/unlocks.css )
Rails.application.config.assets.precompile += %w( users/passwords.css )