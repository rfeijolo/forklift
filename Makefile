container.build:
	docker build -f Dockerfile -t rfeijolo/forklift .

test.unit: container.build
	@docker run rfeijolo/forklift npm test

test.integration: container.build
	@docker run -e FORKLIFT_URL=${FORKLIFT_URL} rfeijolo/forklift npm integration-test

test.coverage: test
	@docker run -e CODECOV_TOKEN=${CODECOV_TOKEN} rfeijolo/forklift npm run coverage-publish

lint: container.build
	@docker run rfeijolo/forklift npm run lint
