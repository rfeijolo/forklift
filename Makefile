container.build:
	docker build -f Dockerfile -t rfeijolo/forklift .

test.unit: container.build
	@docker-compose run forklift npm test

test.integration: container.build
	@docker-compose run -e FORKLIFT_URL=${FORKLIFT_URL} forklift npm integration-test

test.coverage: test
	@docker-compose run -e CODECOV_TOKEN=${CODECOV_TOKEN} forklift npm run coverage-publish

lint: container.build
	@docker-compose run forklift npm run lint
