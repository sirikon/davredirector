#!/usr/bin/env bash

set -e
cd $(dirname ${BASH_SOURCE[0]})/..

docker-compose -p davredirector \
    -f ./docker/docker-compose.yml \
    -f ./docker/docker-compose.override.yml \
    $@
