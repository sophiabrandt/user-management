SHELL := /bin/bash

export PROJECT = usermanagement

# ==============================================================================
# Development

run: pb nx

pb:
	docker compose up -d

nx:
	pnpm run start

# ==============================================================================
# Running tests on local computer

test:
	pnpm run test
