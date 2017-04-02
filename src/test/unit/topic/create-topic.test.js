const test = require('tape');
const fixtures = require('../../fixtures');
const sinon = require('sinon');
const database = require('../../../database');
const validator = require('../../../topic/validator');
const responseFactory = require('../../../responseFactory');

const createTopic = require('../../../topic/create-topic');
test('createTopic should return Ok', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const successSpy = sinon.spy(responseFactory, 'success');
  const createTopicStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(null, anyTopic);

  createTopic(anyTopic, assertSuccessWasCalled);

  function assertSuccessWasCalled(error){
    createTopicStub.restore();
    successSpy.restore();
    assert.true(successSpy.calledWith(anyTopic));
    assert.equal(error, null);
    assert.end();
  }
});

test('createTopic should return Internal Server Error when database throws an error', (assert => {
  const anyTopic = fixtures.createAnyTopic();
  const genericErrorSpy = sinon.spy(responseFactory, 'genericError');
  const createTopicStub = sinon.stub(database, 'createTopic');
  const expectedError = new Error('An unexpected error has ocurred.');
  createTopicStub.yields(expectedError);

  createTopic(anyTopic, assertGenericErrorWasCalled);

  function assertGenericErrorWasCalled(serializedError, response) {
    genericErrorSpy.restore();
    createTopicStub.restore();
    assert.true(genericErrorSpy.calledWith(expectedError));
    assert.equal(response, undefined);
    assert.end();
  }
}));

test('createTopic should return a Bad Request when validation has errors', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const expectedErrors = ['Any error'];
  const badRequestSpy = sinon.spy(responseFactory, 'badRequest');
  const validatorStub = sinon.stub(validator, 'isValid').returns({
    isValid: false,
    errors: expectedErrors
  });

  createTopic(anyTopic, assertBadRequestWasCalled);

  function assertBadRequestWasCalled() {
    badRequestSpy.restore();
    validatorStub.restore();
    assert.true(badRequestSpy.calledWith(expectedErrors));
    assert.end();
  }
});

