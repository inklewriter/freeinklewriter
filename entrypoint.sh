#!/bin/sh
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /usr/src/app/tmp/pids/server.pid

# Initialize / update DB
rake db:create db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
