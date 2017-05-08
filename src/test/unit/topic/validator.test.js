const test = require('tape');
const validator = require('../../../topic/validator');
const fixtures = require('../../fixtures');

test('should return true when topic is valid', (assert) => {
  const anyTopic = fixtures.createAnyTopic();

  validator.isValid(anyTopic, assertIsValid);

  function assertIsValid(error, topic) {
    assert.notOk(error);
    assert.deepEqual(topic, anyTopic);
    assert.end();
  }
});

test('should return false when topic has no name', (assert) => {
  const topicWithoutName = fixtures.createAnyTopic();
  delete topicWithoutName.name;

  validator.isValid(topicWithoutName, assertIsNotValid);

  function assertIsNotValid(error, validatedTopic) {
    assert.ok(error);
    assert.notOk(validatedTopic);
    assert.end();
  }
});

test('should return false when topic has no tags', (assert) => {
  const topicWithoutTags = fixtures.createAnyTopic();
  delete topicWithoutTags.tags;

  validator.isValid(topicWithoutTags, assertIsNotValid);

  function assertIsNotValid(error, validatedTopic) {
    assert.ok(error);
    assert.notOk(validatedTopic);
    assert.end();
  }
});

test('should return false when topic has no owner', (assert) => {
  const topicWithoutOwnerId = fixtures.createAnyTopic();
  const expectedErrors = [
    'should have required property \'ownerId\''
  ];
  delete topicWithoutOwnerId.ownerId;

  validator.isValid(topicWithoutOwnerId, assertIsNotValid);

  function assertIsNotValid(error, validatedTopic) {
    assert.deepEqual(error, expectedErrors);
    assert.notOk(validatedTopic);
    assert.end();
  }
});

test('should return false when ownerId is undefined', (assert) => {
  const topicWithUndefinedOwner = fixtures.createAnyTopic();
  topicWithUndefinedOwner.ownerId = undefined;

  validator.isValid(topicWithUndefinedOwner, assertIsNotValid);

  function assertIsNotValid(error, validatedTopic) {
    assert.ok(error);
    assert.notOk(validatedTopic);
    assert.end();
  }
});

test('should return false when topic has extra properties', (assert) => {
  const topicWithExtraProperties = fixtures.createAnyTopic();
  topicWithExtraProperties.extraProperty = 'extraProperty';

  validator.isValid(topicWithExtraProperties, assertIsNotValid);

  function assertIsNotValid(error, validatedTopic) {
    assert.ok(error);
    assert.notOk(validatedTopic);
    assert.end();
  }
});

