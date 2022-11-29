source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.4'

# Gems are not versionned, please make sure Gemfile.lock is never wiped
# Or the current gem version used will be lost

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '6.0.4.7'
gem 'sprockets'
gem 'puma'

# Compression of assets
gem 'sprockets-exporters_pack'

# CSS
gem 'sass-rails'

# JS
gem 'babel-transpiler'
gem 'execjs'
gem 'terser'

# JS Bundler (ESBUILD)
gem 'jsbundling-rails'

# DB
gem 'pg'
# gem 'redis'

#Authing 
gem 'devise'
gem 'bcrypt'

# Auhtorization
gem "pundit"

# Health & security
gem "airbrake"
gem "health_check"
# gem 'rack-attack'

# Emails
gem 'premailer-rails'


# Functionnal 

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
# foreman can be installed manually
gem 'foreman'


# gem 'devise-jwt'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'standard'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console'
  gem 'listen'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
end