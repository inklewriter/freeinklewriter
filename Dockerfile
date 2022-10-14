FROM ruby:3.0.4-slim-bullseye
WORKDIR /usr/src/app
COPY Gemfile* /usr/src/app/ 
RUN apt update && apt install -y \ 
  build-essential \
  nodejs \
  postgresql-client \
  libpq-dev \
  shared-mime-info \
  libpq-dev \
  tzdata \
  yarn \
  && cd /usr/src/app \
  && bundle install
COPY . . 
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh 
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
