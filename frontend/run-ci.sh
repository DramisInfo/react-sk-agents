#!/bin/bash

# Script to run frontend CI tasks locally in a Docker container
# Usage: ./run-ci.sh [command]
# If no command is provided, it will run lint and test

set -e

# Build the Docker image if needed
if [[ "$(docker images -q frontend-ci 2> /dev/null)" == "" ]]; then
  echo "Building CI Docker image..."
  docker build -f Dockerfile.ci -t frontend-ci .
fi

# Set default command if none provided
if [ -z "$1" ]; then
  COMMAND="sh -c \"npm run lint && npm run test\""
else
  # Use provided command
  COMMAND="$@"
fi

# Run the command in the container
echo "Running: $COMMAND"
docker run --rm -v $(pwd):/app frontend-ci sh -c "$COMMAND"
