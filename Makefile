app.test:
	@docker run --rm -v ${PWD}:/usr/forklift -w /usr/forklift -e CODECOV_TOKEN=${CODECOV_TOKEN} node:7.5 npm run test && npm run coverage-publish

app.lint:
	@docker run --rm -v ${PWD}:/usr/forklift -w /usr/forklift node:7.5 npm run lint
