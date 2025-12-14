FROM ruby:3.3.0-alpine

# Install system dependencies (cached unless packages change)
RUN --mount=type=cache,target=/var/cache/apk apk add --update \
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

# Create non-privileged user and give ownership of workdir
RUN addgroup -g 1000 inkle && \
    adduser -D -u 1000 -G inkle inkle && \
    mkdir -p /usr/src/app/ && \
    chown inkle:inkle /usr/src/app/

WORKDIR /usr/src/app

# Switch to non-privileged user
USER inkle

COPY --chown=inkle:inkle package*.json /usr/src/app/
RUN --mount=type=cache,target=/tmp/npm \
    npm install --loglevel=verbose
# Install Ruby gems (cached unless Gemfile changes)
COPY --chown=inkle:inkle Gemfile* /usr/src/app/
RUN --mount=type=cache,target=/usr/local/bundle/cache \
    --mount=type=cache,target=/usr/src/app/vendor/cache \
    bundle cache && \
    bundle install --production && \
    bundle clean --force


COPY --chown=inkle:inkle . .

COPY --chown=inkle:inkle entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
