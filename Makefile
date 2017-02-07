container.build:
	docker build -f Dockerfile -t rfeijolo/forklift .
app.test: container.build
	@docker-compose run forklift npm test

app.test.coverage: app.test
	@docker-compose run -e CODECOV_TOKEN=${CODECOV_TOKEN} forklift npm run coverage-publish

app.lint: container.build
	@docker-compose run forklift npm run lint
