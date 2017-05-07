const test = require('tape');
const fixtures = require('../../fixtures');
const sinon = require('sinon');
const database = require('../../../database');
const validator = require('../../../topic/validator');
const responseFactory = require('../../../response-factory');
const notificationStore = require('../../../notification-store');

const createTopic = require('../../../topic/create-topic');
test('createTopic should return Ok', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 200 };
  const successStub = sinon.stub(responseFactory, 'success');
  const createTopicStub = sinon.stub(notificationStore, 'createTopic');
  const saveInDatabaseStub = sinon.stub(database, 'createTopic');
  createTopicStub.yields(null, anyTopic.notificationStoreId);
  saveInDatabaseStub.yields(null, anyTopic);
  successStub.returns(anyResponse);

  createTopic(anyTopic, assertSuccessWasCalled);

  function assertSuccessWasCalled(error, response){
    createTopicStub.restore();
    successStub.restore();
    saveInDatabaseStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
});

test('createTopic should return Internal Server Error when database throws an error', (assert => {
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 500 };
  const genericErrorStub = sinon.stub(responseFactory, 'genericError');
  const createTopicStub = sinon.stub(notificationStore, 'createTopic');
  const saveInDatabaseStub = sinon.stub(database, 'createTopic');
  const expectedError = new Error('An unexpected error has ocurred.');
  createTopicStub.yields(null, anyTopic.notificationStoreId);
  saveInDatabaseStub.yields(expectedError);
  genericErrorStub.returns(anyResponse);

  createTopic(anyTopic, assertGenericErrorWasCalled);

  function assertGenericErrorWasCalled(error, response) {
    createTopicStub.restore();
    genericErrorStub.restore();
    saveInDatabaseStub.restore();
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

