FROM ruby:2.6.7-alpine

WORKDIR /usr/src/app
COPY Gemfile* /usr/src/app/ 
RUN apk add --update \ 
  build-base \
  nodejs \
  postgresql-client \
  postgresql-dev \
  shared-mime-info \
  sqlite-dev \
  tzdata \
  yarn \
  && rm -rf /var/cache/apk/* \
  && cd /usr/src/app \
  && bundle install
COPY . . 

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh 

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
