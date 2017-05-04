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
  const getTopicStub = sinon.stub(database, 'getTopic');
  const isAuthorizedStub = sinon.stub(validator, 'isAuthorized');
  const isValidStub = sinon.stub(validator, 'isValid');
  const createMessageStub = sinon.stub(database, 'createMessage');
  const createTopicStub = sinon.stub(responseFactory, 'success');
  getTopicStub.yields(null, anyTopic);
  isAuthorizedStub.returns(true);
  isValidStub.returns({ isValid: true });
  createTopicStub.returns(anyResponse);
  createMessageStub.yields(null, anyMessage);

  createMessage(anyMessage, isResponseOk);

  function isResponseOk(error, response){
    getTopicStub.restore();
    isAuthorizedStub.restore();
    isValidStub.restore();
    createTopicStub.restore();
    createMessageStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
});

test('createMessage should return Internal Server Error', (assert => {
  const anyMessage = new MessageFixture().build();
  const anyTopic = fixtures.createAnyTopic();
  const anyResponse = { statusCode: 500 };
  const expectedErrorMessage = 'An unexpected error has ocurred.';
  const getTopicStub = sinon.stub(database, 'getTopic');
  const isAuthorizedStub = sinon.stub(validator, 'isAuthorized');
  const isValidStub = sinon.stub(validator, 'isValid');
  const genericErrorStub = sinon.stub(responseFactory, 'genericError');
  const createMessageStub = sinon.stub(database, 'createMessage');
  getTopicStub.yields(null, anyTopic);
  isAuthorizedStub.returns(true);
  isValidStub.returns({ isValid: true });
  createMessageStub.yields(new Error(expectedErrorMessage));
  genericErrorStub.returns(anyResponse);

  createMessage(anyMessage, isResponseInternalServerError);

  function isResponseInternalServerError(error, response) {
    getTopicStub.restore();
    isAuthorizedStub.restore();
    isValidStub.restore();
    createMessageStub.restore();
    genericErrorStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

