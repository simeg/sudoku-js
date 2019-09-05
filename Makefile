.PHONY: format fmt lint serve test

NPM=$(shell which npm)
NODE=$(shell which node)
GIT=$(shell which git)
BINS=$(shell npm bin)

BABEL_NODE=$(BINS)/babel-node
JEST=$(BINS)/jest
NODEMON=$(BINS)/nodemon
PRETTIER=$(BINS)/prettier

ci: lint test

format:
	$(PRETTIER) "**/*.js" --write

fmt: format

lint:
	$(PRETTIER) --list-different "**/*.js"

serve:
	@$(NODEMON) $(BABEL_NODE) src/index.js

test:
	@$(JEST)

test-watch:
	@$(NODEMON) $(JEST)
