const test = require('tape');
const createTopic = require('../../../topic/createTopic');
const callbacks = require('../callbacks');
const fixtures = require('../../fixtures');

test('createTopic should return Ok', (assert) => {
  const databaseMock = {
    createTopic: callbacks.noop
  };
  const anyTopic = fixtures.createAnyTopic();

  createTopic(anyTopic, databaseMock, isResponseOk);

  function isResponseOk(error, response){
    const okStatusCode = 200;
    const serializedBody = JSON.stringify(anyTopic);

    assert.equal(error, null);
    assert.equal(response.statusCode, okStatusCode);
    assert.equal(response.body, serializedBody);
    assert.end();
  }
});

test('createTopic should return Internal Server Error', (assert => {
  const databaseMock  = {
    createTopic: callbacks.throwError
  };
  const anyTopic = fixtures.createAnyTopic();

  createTopic(anyTopic, databaseMock, isResponseInternalServerError);

  function isResponseInternalServerError(serializedError, response) {
    const internalServerErrorStatusCode = 500;

    const error = JSON.parse(serializedError);

    assert.equal(error.statusCode, internalServerErrorStatusCode);
    assert.equal(error.message, 'An unexpected error has ocurred.');
    assert.equal(response, undefined);
    assert.end();
  }
}));
