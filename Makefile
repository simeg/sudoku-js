.PHONY: test run

NPM=$(shell which npm)
NODE=$(shell which node)
GIT=$(shell which git)
BINS=$(shell npm bin)

BABEL_NODE=$(BINS)/babel-node
JEST=$(BINS)/jest
NODEMON=$(BINS)/nodemon
PRETTIER=$(BINS)/prettier

test:
	@$(NODEMON) $(JEST)

run:
	@$(NODEMON) $(BABEL_NODE) src/sudoku.js

format:
	$(PRETTIER) "**/*.js" --write

fmt: format

lint:
	$(PRETTIER) --list-different "**/*.js"
