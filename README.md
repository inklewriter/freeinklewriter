# Inklewriter / Freeinklewriter

This project is a free reverse-engineered version of the (inklewriter server)[https://writer.inklestudios.com].

Thanks to Inklestudio for allowing us to use the JS code and make their work available for everyone again !

## Crash course

Caution, this is an untested method, more to come soon

On a debian / ubuntu server it should look like this 
<code>
  # install rbenv
  cd
  git clone https://github.com/rbenv/rbenv.git ~/.rbenv
  echo 'export path="$home/.rbenv/bin:$path"' >> ~/.bashrc
  echo 'eval "$(rbenv init -)"' >> ~/.bashrc
  exec $shell

  git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
  echo 'export path="$home/.rbenv/plugins/ruby-build/bin:$path"' >> ~/.bashrc
  exec $shell

  rbenv install 2.6.5
  rbenv global 2.6.5
  ruby -v

  gem install rails -v 6.0.0

  # install pgsql
  sudo apt install postgresql-11 libpq-dev

  # Clone the app
  git clone https://github.com/inklewriter/freeinklewriter

  # Configure the app 
  # That's @todo
  # Create db & role
  # Edit the local config
 
  rake db:create

  rails server
</code>
