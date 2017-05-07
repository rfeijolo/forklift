const createMessage = require('../../../message/create-message');
const MessageFixture = require('../../message-builder');
const test = require('tape');
const database = require('../../../database');
const validator = require('../../../message/validator');
const sinon = require('sinon');
const responseFactory = require('../../../response-factory');
const fixtures = require('../../fixtures');

test('createMessage should return Ok', (assert) => {
  const anyMessage = new MessageFixture().build();
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 200 };
  const isValidStub = sinon.stub(validator, 'isValid');
  isValidStub.yields(null, anyMessage);
  const getTopicStub = sinon.stub(database, 'getTopic');
  getTopicStub.yields(null, anyTopic);
  const isAuthorizedStub = sinon.stub(validator, 'isAuthorized');
  isAuthorizedStub.yields(null, anyMessage);
  const createMessageStub = sinon.stub(database, 'createMessage');
  createMessageStub.yields(null, anyMessage);
  const successStub = sinon.stub(responseFactory, 'success');
  successStub.returns(anyResponse);

  createMessage(anyMessage, isResponseOk);

  function isResponseOk(error, response){
    isValidStub.restore();
    getTopicStub.restore();
    isAuthorizedStub.restore();
    createMessageStub.restore();
    successStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
});

test('createMessage should return Bad Request when validation fails', (assert => {
  const anyMessage = new MessageFixture().build();
  const anyResponse = { statusCode: 400 };

  const isValidStub = sinon.stub(validator, 'isValid');
  isValidStub.yields(new Error('anyValidationError'));
  const badRequestStub = sinon.stub(responseFactory, 'badRequest');
  badRequestStub.returns(anyResponse);

  createMessage(anyMessage, isBadRequest);

  function isBadRequest(error, response) {
    isValidStub.restore();
    badRequestStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

test('createMessage should return Internal Server Error when getTopic fails', (assert => {
  const anyMessage = new MessageFixture().build();
  const anyResponse = { statusCode: 500 };

  const isValidStub = sinon.stub(validator, 'isValid');
  isValidStub.yields(null, anyMessage);
  const getTopicStub = sinon.stub(database, 'getTopic');
  getTopicStub.yields(new Error('anyError'));
  const genericErrorStub = sinon.stub(responseFactory, 'genericError');
  genericErrorStub.returns(anyResponse);

  createMessage(anyMessage, isInternalServerError);

  function isInternalServerError(error, response) {
    isValidStub.restore();
    getTopicStub.restore();
    genericErrorStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

test('createMessage should return Forbidden when authorization fails', (assert => {
  const anyMessage = new MessageFixture().build();
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 403 };

  const isValidStub = sinon.stub(validator, 'isValid');
  isValidStub.yields(null, anyMessage);
  const getTopicStub = sinon.stub(database, 'getTopic');
  getTopicStub.yields(null, anyTopic);
  const isAuthorizedStub = sinon.stub(validator, 'isAuthorized');
  isAuthorizedStub.yields(new Error('anyError'));
  const forbiddenStub = sinon.stub(responseFactory, 'forbidden');
  forbiddenStub.returns(anyResponse);

  createMessage(anyMessage, isUnauthorized);

  function isUnauthorized(error, response) {
    isValidStub.restore();
    getTopicStub.restore();
    isAuthorizedStub.restore();
    forbiddenStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

test('createMessage should return Internal Server Error when createMessage fails', (assert => {
  const anyMessage = new MessageFixture().build();
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 500 };

  const isValidStub = sinon.stub(validator, 'isValid');
  isValidStub.yields(null, anyMessage);
  const getTopicStub = sinon.stub(database, 'getTopic');
  getTopicStub.yields(null, anyTopic);
  const isAuthorizedStub = sinon.stub(validator, 'isAuthorized');
  isAuthorizedStub.yields(null, anyMessage);
  const createMessageStub = sinon.stub(database, 'createMessage');
  createMessageStub.yields(new Error('anyError'));
  const genericErrorStub = sinon.stub(responseFactory, 'genericError');
  genericErrorStub.returns(anyResponse);

  createMessage(anyMessage, isInternalServerError);

  function isInternalServerError(error, response) {
    isValidStub.restore();
    getTopicStub.restore();
    isAuthorizedStub.restore();
    createMessageStub.restore();
    genericErrorStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

