const test = require('tape');
const fixtures = require('../../fixtures');
const sinon = require('sinon');
const database = require('../../../database');
const validator = require('../../../topic/validator');
const responseFactory = require('../../../responseFactory');

const createTopic = require('../../../topic/create-topic');
test('createTopic should return Ok', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 200 };
  const successStub = sinon.stub(responseFactory, 'success');
  const createTopicStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(null, anyTopic);
  successStub.returns(anyResponse);

  createTopic(anyTopic, assertSuccessWasCalled);

  function assertSuccessWasCalled(error, response){
    successStub.restore();
    createTopicStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
});

test('createTopic should return Internal Server Error when database throws an error', (assert => {
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 500 };
  const genericErrorStub = sinon.stub(responseFactory, 'genericError');
  const createTopicStub = sinon.stub(database, 'createTopic');
  const expectedError = new Error('An unexpected error has ocurred.');
  createTopicStub.yields(expectedError);
  genericErrorStub.returns(anyResponse);

  createTopic(anyTopic, assertGenericErrorWasCalled);

  function assertGenericErrorWasCalled(error, response) {
    genericErrorStub.restore();
    createTopicStub.restore();
    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

test('createTopic should return a Bad Request when validation has errors', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const expectedErrors = ['Any error'];
  const anyResponse = { statusCode: 400 };
  const badRequestStub = sinon.stub(responseFactory, 'badRequest');
  const validatorStub = sinon.stub(validator, 'isValid').returns({
    isValid: false,
    errors: expectedErrors
  });
  badRequestStub.returns(anyResponse);

  createTopic(anyTopic, assertBadRequestWasCalled);

  function assertBadRequestWasCalled(error, response) {
    badRequestStub.restore();
    validatorStub.restore();
    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
});

