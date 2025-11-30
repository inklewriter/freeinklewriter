FROM ruby:3.3.0-alpine

WORKDIR /usr/src/app

# Install system dependencies (cached unless packages change)
RUN apk add --update \
  build-base \
  nodejs \
  npm \
  postgresql-client \
  postgresql-dev \
  shared-mime-info \
  sqlite-dev \
  tzdata \
  yarn \
  && rm -rf /var/cache/apk/*

# Install Ruby gems (cached unless Gemfile changes)
COPY Gemfile* /usr/src/app/
RUN bundle install

COPY package*.json /usr/src/app/
RUN npm install

COPY . . 

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh 

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
