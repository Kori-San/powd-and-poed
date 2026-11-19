# Every command for this repo runs through make.
# A target is listed by `make help` when its line ends with "## <description>".

.DEFAULT_GOAL := help

.PHONY: help
help: ## List every target and what it does
	@awk -F ':.*## ' '/^[a-zA-Z0-9_-]+:.*## / { printf "%-14s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: check
check: ## Check every file for banned characters and phrases
	node scripts/check-text.mjs
