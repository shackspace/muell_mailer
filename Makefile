REPORTER = dot
MOCHA = ./node_modules/.bin/mocha
JSHINT = ./node_modules/.bin/jshint


all: install test

install:
	npm install

test: jshint mocha

jshint:
	$(JSHINT) app.js
	$(JSHINT) config.js
	$(JSHINT) lib/mail-message.js
	$(JSHINT) test/mail-message.test.js
	$(JSHINT) test/checkDate.test.js

mocha:
	@NODE_ENV=test $(MOCHA) \
		--reporter $(REPORTER) \
		--ui tdd

.PHONY: all test jshint mocha

