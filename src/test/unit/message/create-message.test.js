const createMessage = require('../../../message/create-message');
const MessageFixture = require('../../message-builder');
const test = require('tape');
const database = require('../../../database');
const sinon = require('sinon');
const responseFactory = require('../../../response-factory');

test('createMessage should return Ok', (assert) => {
  const anyMessage = new MessageFixture().build();
  const anyResponse = { statusCode: 200 };
  const createMessageStub = sinon.stub(database, 'createMessage');
  const createTopicStub = sinon.stub(responseFactory, 'success');
  createTopicStub.returns(anyResponse);
  createMessageStub.yields(null, anyMessage);

  createMessage(anyMessage, isResponseOk);

  function isResponseOk(error, response){
    createTopicStub.restore();
    createMessageStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
});

test('createMessage should return Internal Server Error', (assert => {
  const anyMessage = new MessageFixture().build();
  const anyResponse = { statusCode: 500 };
  const expectedErrorMessage = 'An unexpected error has ocurred.';
  const genericErrorStub = sinon.stub(responseFactory, 'genericError');
  const createMessageStub = sinon.stub(database, 'createMessage');
  createMessageStub.yields(new Error(expectedErrorMessage));
  genericErrorStub.returns(anyResponse);

  createMessage(anyMessage, isResponseInternalServerError);

  function isResponseInternalServerError(error, response) {
    createMessageStub.restore();
    genericErrorStub.restore();

    assert.notOk(error);
    assert.equal(response, anyResponse);
    assert.end();
  }
}));

