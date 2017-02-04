app.test:
	docker run --rm -v ${PWD}:/usr/forklift -w /usr/forklift node:7.5 npm run test

app.lint:
	docker run --rm -v ${PWD}:/usr/forklift -w /usr/forklift node:7.5 npm run lint
