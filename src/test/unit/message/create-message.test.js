const callbacks = require('../callbacks');
const createMessage = require('../../../message/create-message');
const fixtures = require('../../fixtures');
const test = require('tape');

test('createMessage should return Ok', (assert) => {
  const databaseMock = {
    createMessage: callbacks.noop
  };
  const anyMessage = fixtures.createAnyMessage();

  createMessage(anyMessage, databaseMock, isResponseOk);

  function isResponseOk(error, response){
    const okStatusCode = 200;
    const serializedBody = JSON.stringify(anyMessage);

    assert.equal(error, null);
    assert.equal(response.statusCode, okStatusCode);
    assert.equal(response.body, serializedBody);
    assert.end();
  }
});

test('createMessage should return Internal Server Error', (assert => {
  const databaseMock  = {
    createMessage: callbacks.throwError
  };
  const anyMessage = fixtures.createAnyMessage();

  createMessage(anyMessage, databaseMock, isResponseInternalServerError);

  function isResponseInternalServerError(serializedError, response) {
    const internalServerErrorStatusCode = 500;

    const error = JSON.parse(serializedError);

    assert.equal(error.statusCode, internalServerErrorStatusCode);
    assert.equal(error.message, 'An unexpected error has ocurred.');
    assert.equal(response, undefined);
    assert.end();
  }
}));
