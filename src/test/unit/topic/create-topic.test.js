const test = require('tape');
const fixtures = require('../../fixtures');
const sinon = require('sinon');
const database = require('../../../database');

const createTopic = require('../../../topic/create-topic');
test('createTopic should return Ok', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const createTopicStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(null, anyTopic);

  createTopic(anyTopic, isResponseOk);

  function isResponseOk(error, response){
    const okStatusCode = 200;
    const serializedBody = JSON.stringify(anyTopic);

    assert.equal(error, null);
    assert.equal(response.statusCode, okStatusCode);
    assert.equal(response.body, serializedBody);
    createTopicStub.restore();
    assert.end();
  }
});

test('createTopic should return Internal Server Error', (assert => {
  const anyTopic = fixtures.createAnyTopic();
  const expectedErrorMessage = 'An unexpected error has ocurred.';
  const createTopicStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(new Error(expectedErrorMessage));

  createTopic(anyTopic, isResponseInternalServerError);

  function isResponseInternalServerError(serializedError, response) {
    const internalServerErrorStatusCode = 500;

    const error = JSON.parse(serializedError);

    assert.equal(error.statusCode, internalServerErrorStatusCode);
    assert.equal(error.message, expectedErrorMessage);
    assert.equal(response, undefined);
    createTopicStub.restore();
    assert.end();
  }
}));

