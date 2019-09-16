.PHONY: format fmt lint serve test

NPM=$(shell which npm)
NODE=$(shell which node)
GIT=$(shell which git)
BINS=$(shell npm bin)

BABEL_NODE=$(BINS)/babel-node
BABEL=$(BINS)/babel
JEST=$(BINS)/jest
NODEMON=$(BINS)/nodemon
PRETTIER=$(BINS)/prettier

build:
	$(BABEL) -d ./build ./src -s

ci: lint test

deploy:
	$(GIT) push heroku master

format:
	$(PRETTIER) "**/*.js" --write

fmt: format

lint:
	$(PRETTIER) --list-different "**/*.js"

move-html:
	cp -r src/views build/

production: build move-html
	$(NODE) build/index.js

serve:
	@$(NODEMON) $(BABEL_NODE) src/index.js

test:
	@$(JEST)

test-watch:
	@$(NODEMON) $(JEST)
