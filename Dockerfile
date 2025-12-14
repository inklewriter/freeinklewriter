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

# Create non-privileged user and prepare workdir
RUN addgroup -g 1000 inkle && \
    adduser -D -u 1000 -G inkle inkle

WORKDIR /usr/src/app

# Install Ruby gems as root (cached unless Gemfile changes)
COPY Gemfile* /usr/src/app/
RUN --mount=type=cache,target=/usr/local/bundle/cache \
    bundle install && \
    bundle clean --force

# Install Node packages as root
COPY package*.json /usr/src/app/
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Copy application code and set ownership
COPY . .
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh && \
    chown -R inkle:inkle /usr/src/app

# Switch to non-privileged user
USER inkle

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
