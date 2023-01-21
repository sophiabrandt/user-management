SHELL := /bin/bash

export PROJECT = usermanagement

# ==============================================================================
# Seed database (create admin user via web interface first)

seed:
	if [ ! -f dist/esm/package.json ]; then echo '{"type": "module"}' > dist/esm/package.json; fi
	pnpm run seed


# ==============================================================================
# Development

run: pb nx

pb:
	docker compose up -d

nx:
	pnpm run start

down:
	docker compose down -v --remove-orphans

# ==============================================================================
# Running tests on local computer

test:
	pnpm run test
