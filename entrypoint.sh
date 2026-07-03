#!/bin/sh

# Debug: at runtime  `mkdir': Permission denied @ dir_s_mkdir - /usr/src/app/tmp (Errno::EACCES)
echo The current user is "$(whoami)" with uid:"$UID" gid:"$GID" home:"$HOME"
echo The current main dir permissions are:
ls -lh /usr/src/app

# Create tmp directories if they don't exist (ignore errors if already exist with wrong ownership)
mkdir -p /usr/src/app/tmp/cache /usr/src/app/tmp/pids /usr/src/app/tmp/sockets 2>/dev/null && echo "✓ mkdir success" || echo "✗ mkdir failed"

# Try to set permissions on tmp (may fail in volume mounts with different UIDs, that's OK)
chmod -R 0777 /usr/src/app/tmp 2>/dev/null && echo "✓ chmod success" || echo "✗ chmod failed"

# Remove a potentially pre-existing server.pid for Rails (ignore errors if can't remove)
rm -f /usr/src/app/tmp/pids/server.pid 2>/dev/null && echo "✓ rm success" || echo "✗ rm failed"

# Initialize / update DB
rake db:create db:migrate && echo "✓ rake success" || echo "✗ rake failed"

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
