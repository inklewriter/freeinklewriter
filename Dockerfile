FROM arm32v6/ruby:2.5-alpine

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app tmp/db && /sbin/apk add --no-cache nodejs postgresql-client bash 
COPY Gemfile* /usr/src/app/ 
RUN bundle install
COPY . . 

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
