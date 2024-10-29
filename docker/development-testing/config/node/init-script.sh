#!/bin/bash

NODE_MODULES_DIR="/app/code/node_modules"

if [ ! -d "$NODE_MODULES_DIR" ]; then
  echo "node_modules does not exist. Running 'yarn install'..."
  cd /app/code && yarn install
else
  echo "node_modules already exists. Skipping 'yarn install'."
fi

case "$SERVER_MODE" in
  serve)
    echo "Running 'yarn run serve'..."
    cd /app/code && yarn run serve
    ;;
  test:dev)
    echo "Running 'yarn test:dev'..."
    cd /app/code && yarn test:dev
    ;;
  test:mocked)
    echo "Running 'yarn test:mocked'..."
    cd /app/code && yarn test:dev
    ;;
  none)
    echo "SERVER_MODE is set to none. No action will be taken."
    ;;
  *)
    echo "Unknown SERVER_MODE: $SERVER_MODE. Exiting..."
    exit 1
    ;;
esac

tail -f /dev/null
