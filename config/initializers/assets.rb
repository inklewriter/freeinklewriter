# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
# Add inklewriter source files to asset load path
Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'javascripts', 'inklewriter-source')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

# Inklewriter JavaScript bundles (compiled from source)
Rails.application.config.assets.precompile += %w( inklewriter-main.js inklewriter-readmode.js )
