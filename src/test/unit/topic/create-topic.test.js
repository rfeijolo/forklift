const test = require('tape');
const fixtures = require('../../fixtures');
const sinon = require('sinon');
const database = require('../../../database');
const validator = require('../../../topic/validator');

const createTopic = require('../../../topic/create-topic');
test('createTopic should return Ok', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const createTopicStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(null, anyTopic);

  createTopic(anyTopic, isResponseOk);

  function isResponseOk(error, response){
    createTopicStub.restore();
    const okStatusCode = 200;
    const serializedBody = JSON.stringify(anyTopic);

    assert.equal(error, null);
    assert.equal(response.statusCode, okStatusCode);
    assert.equal(response.body, serializedBody);
    assert.end();
  }
});

test('createTopic should return Internal Server Error when database throws an error', (assert => {
  const anyTopic = fixtures.createAnyTopic();
  const expectedErrorMessage = 'An unexpected error has ocurred.';
  const createTopicStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(new Error(expectedErrorMessage));

  createTopic(anyTopic, isResponseInternalServerError);

  function isResponseInternalServerError(serializedError, response) {
    createTopicStub.restore();
    const internalServerErrorStatusCode = 500;

    const error = JSON.parse(serializedError);

    assert.equal(error.statusCode, internalServerErrorStatusCode);
    assert.equal(error.message, expectedErrorMessage);
    assert.equal(response, undefined);
    assert.end();
  }
}));

test('createTopic should return a Bad Request when validation has errors', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const expectedErrors = ['Any error message'];

  const validatorStub = sinon.stub(validator, 'isValid').returns({
    isValid: false,
    errors: expectedErrors
  });

  createTopic(anyTopic, isBadRequest);

  function isBadRequest(response) {
    validatorStub.restore();
    assert.equal(400, response.statusCode);
    assert.deepEqual(response.body, expectedErrors);
    assert.end();
  }
});

