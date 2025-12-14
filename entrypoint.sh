#!/bin/sh
set -e

# Debug: at runtime  `mkdir': Permission denied @ dir_s_mkdir - /usr/src/app/tmp (Errno::EACCES)
echo The current user is "$(whoami)"
echo The current main dir permissions are:
ls -lh /usr/src/app
mkdir -p /usr/src/app/tmp
chmod 0777 -R /usr/src/app/tmp


# Remove a potentially pre-existing server.pid for Rails.
rm -f /usr/src/app/tmp/pids/server.pid

# Initialize / update DB
rake db:create db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
