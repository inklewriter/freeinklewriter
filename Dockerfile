ARG BASE_IMAGE=ruby:3.3.0-alpine


FROM $BASE_IMAGE 

ARG APP_PATH="/usr/src/app"
ARG USER_ID=1001
ARG GROUP_ID=1001

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

# Create non-privileged user (UID 1001 to match GitHub Actions runner)
# Can be overridden with build args for local development
RUN addgroup -g ${GROUP_ID} inkle && \
    adduser -D -u ${USER_ID} -G inkle inkle

WORKDIR $APP_PATH

# Install Ruby gems as root (cached unless Gemfile changes)
COPY Gemfile* $APP_PATH/
RUN --mount=type=cache,target=/usr/local/bundle/cache \
    bundle install && \
    bundle clean --force

# Install Node packages as root
COPY package*.json $APP_PATH/
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Copy application code and set ownership
COPY . .
RUN chmod +x /usr/bin/entrypoint.sh && \
    chown -R inkle:inkle $APP_PATH

# Switch to non-privileged user
USER inkle


ENTRYPOINT ["$APP_PATH/entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
