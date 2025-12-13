FROM ruby:3.3.0-alpine

WORKDIR /usr/src/app

# Install system dependencies (cached unless packages change)
RUN apk add --update \
  build-base \
  curl \
  nodejs \
  npm \
  postgresql-client \
  postgresql-dev \
  shared-mime-info \
  sqlite-dev \
  tzdata \
  yarn \
  && rm -rf /var/cache/apk/*

# Create non-privileged user
RUN addgroup -g 1000 inkle && \
    adduser -D -u 1000 -G inkle inkle

# Install Ruby gems (cached unless Gemfile changes)
COPY --chown=inkle:inkle Gemfile* /usr/src/app/
RUN --mount=type=cache,target=/usr/local/bundle/cache \
    --mount=type=cache,target=/usr/src/app/vendor/cache \
    bundle cache && \
    bundle install && \
    bundle clean --force

COPY --chown=inkle:inkle package*.json /usr/src/app/
RUN npm install

COPY --chown=inkle:inkle . .

COPY --chown=inkle:inkle entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Ensure inkle user owns tmp directories for cache and pids
RUN mkdir -p /usr/src/app/tmp/cache /usr/src/app/tmp/pids && \
    chown -R inkle:inkle /usr/src/app/tmp

# Switch to non-privileged user
USER inkle

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
