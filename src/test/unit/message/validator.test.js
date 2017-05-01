const test = require('tape');
const validator = require('../../../message/validator');
const MessageBuilder = require('../../message-builder');

test('should return true when message is valid', (assert) => {
  const messageBuilder = new MessageBuilder();
  const anyMessage = messageBuilder.withTopicId('anyTopicId').build();

  const result = validator.isValid(anyMessage);

  assert.ok(result.isValid);
  assert.end();
});

test('should return false when message has no title', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutTitle = messageBuilder.build();
  delete messageWithoutTitle.title;

  const result = validator.isValid(messageWithoutTitle);

  assert.notOk(result.isValid);
  assert.end();
});

test('should return false when message has no text', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutText = messageBuilder.build();
  delete messageWithoutText.text;

  const result = validator.isValid(messageWithoutText);

  assert.notOk(result.isValid);
  assert.end();
});

test('should return false when message has no topicId', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutTopicId = messageBuilder.withTopicId(undefined).build();
  delete messageWithoutTopicId.topicId;

  const result = validator.isValid(messageWithoutTopicId);

  assert.notOk(result.isValid);
  assert.end();
});

test('should return false when message has no ownerId', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithoutOwnerId = messageBuilder.build();
  delete messageWithoutOwnerId.ownerId;

  const result = validator.isValid(messageWithoutOwnerId);

  assert.notOk(result.isValid);
  assert.end();
});

test('should return false when message has extra properties', (assert) => {
  const messageBuilder = new MessageBuilder();
  const messageWithExtraProperties = messageBuilder.build();
  messageWithExtraProperties.extraProperty = 'extraProperty';

  const result = validator.isValid(messageWithExtraProperties);

  assert.notOk(result.isValid);
  assert.end();
});
