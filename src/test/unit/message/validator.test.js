const test = require('tape');
const fixtures = require('../../fixtures');
const validator = require('../../../message/validator');
const MessageBuilder = require('../../message-builder');

test('isValid should return true when message is valid', (assert) => {
  const messageBuilder = new MessageBuilder();
  const anyMessage = messageBuilder.withTopicId('anyTopicId').build();

  validator.isValid(anyMessage, assertIsValid);

  function assertIsValid(error, validatedMessage) {
    assert.notOk(error);
    assert.deepEqual(validatedMessage, anyMessage);
    assert.end();
  }
});

test('isValid should return false when message has no title', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutTitle = messageBuilder.build();
  delete messageWithoutTitle.title;

  validator.isValid(messageWithoutTitle, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.ok(error);
    assert.notOk(validatedMessage);
    assert.end();
  }
});

test('isValid should return false when message has no text', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutText = messageBuilder.build();
  delete messageWithoutText.text;

  validator.isValid(messageWithoutText, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.ok(error);
    assert.notOk(validatedMessage);
    assert.end();
  }
});

test('isValid should return false when message has no topicId', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutTopicId = messageBuilder.withTopicId(undefined).build();
  delete messageWithoutTopicId.topicId;

  validator.isValid(messageWithoutTopicId, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.ok(error);
    assert.notOk(validatedMessage);
    assert.end();
  }
});

test('isValid should return false when message has no ownerId', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutOwnerId = messageBuilder.build();
  delete messageWithoutOwnerId.ownerId;

  validator.isValid(messageWithoutOwnerId, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.ok(error);
    assert.notOk(validatedMessage);
    assert.end();
  }
});

test('isValid should return false when message has extra properties', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithExtraProperties = messageBuilder.build();
  messageWithExtraProperties.extraProperty = 'extraProperty';

  validator.isValid(messageWithExtraProperties, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.ok(error);
    assert.notOk(validatedMessage);
    assert.end();
  }
});

test('isAuthorized should return true when message and topic have the same owner', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const messageBuilder = new MessageBuilder();
  const anyMessage = messageBuilder.build();

  anyMessage.ownerId = anyTopic.ownerId;

  validator.isAuthorized(anyTopic, anyMessage, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.notOk(error);
    assert.deepEqual(validatedMessage, anyMessage);
    assert.end();
  }
});

test('isAuthorized should return false when message and topic have different owners', (assert) => {
  const anyTopic = fixtures.createAnyTopic();
  const messageBuilder = new MessageBuilder();
  const anyMessage = messageBuilder.build();

  anyMessage.ownerId = 'otherOwnerId';

  validator.isAuthorized(anyTopic, anyMessage, assertIsNotValid);

  function assertIsNotValid(error, validatedMessage) {
    assert.ok(error);
    assert.notOk(validatedMessage);
    assert.end();
  }
});

