#!/bin/bash

# Minimal script to run backend CI tasks in Docker
# All logic should be in Dockerfile.ci
# Usage: ./run-ci.sh [command]

set -e

# Always build the Docker image to pick up any changes
echo "Building CI Docker image..."
docker build -f Dockerfile.ci -t backend-ci .

# Create a custom PYTHONPATH that includes the parent directory
# This ensures 'backend' is importable from the parent directory
echo "Running in backend-ci Docker container..."
docker run --rm -v "$(cd .. && pwd)":/workspace -e PYTHONPATH=/workspace -w /workspace/backend backend-ci "$@"
