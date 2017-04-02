const createMessage = require('../../../message/create-message');
const MessageFixture = require('../../message-builder');
const test = require('tape');
const database = require('../../../database');
const sinon = require('sinon');

test('createMessage should return Ok', (assert) => {
  const anyMessage = new MessageFixture().build();
  const createMessageStub = sinon.stub(database, 'createMessage');
  createMessageStub.yields(null, anyMessage);

  createMessage(anyMessage, isResponseOk);

  function isResponseOk(error, response){
    createMessageStub.restore();
    const okStatusCode = 200;
    const serializedBody = JSON.stringify(anyMessage);

    assert.equal(error, null);
    assert.equal(response.statusCode, okStatusCode);
    assert.equal(response.body, serializedBody);
    assert.end();
  }
});

test('createMessage should return Internal Server Error', (assert => {
  const anyMessage = new MessageFixture().build();
  const expectedErrorMessage = 'An unexpected error has ocurred.';
  const createMessageStub = sinon.stub(database, 'createMessage');
  createMessageStub.yields(new Error(expectedErrorMessage));

  createMessage(anyMessage, isResponseInternalServerError);

  function isResponseInternalServerError(serializedError, response) {
    createMessageStub.restore();
    const internalServerErrorStatusCode = 500;
    const error = JSON.parse(serializedError);

    assert.equal(error.statusCode, internalServerErrorStatusCode);
    assert.equal(error.message, expectedErrorMessage);
    assert.equal(response, undefined);
    assert.end();
  }
}));

