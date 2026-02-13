#!/bin/sh
set -e

# Wait for PostgreSQL to be ready, then run migrations
if [ -n "$DATABASE_URL" ]; then
  echo "Waiting for database..."
  sleep 5
  echo "Running migrations..."
  node ./node_modules/prisma/build/index.js migrate deploy
  echo "Migrations complete."
fi

exec node server.js
