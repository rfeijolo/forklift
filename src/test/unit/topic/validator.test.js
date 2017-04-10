const test = require('tape');
const validator = require('../../../topic/validator');
const fixtures = require('../../fixtures');

test('should return true when topic is valid', (assert) => {
  const anyTopic = fixtures.createAnyTopic();

  const result = validator.isValid(anyTopic);

  assert.equal(result.isValid, true);
  assert.end();
});

test('should return false when topic has no name', (assert) => {
  const topicWithoutName = fixtures.createAnyTopic();
  delete topicWithoutName.name;

  const result = validator.isValid(topicWithoutName);

  assert.equal(result.isValid, false);
  assert.end();
});

test('should return false when topic has no tags', (assert) => {
  const topicWithoutTags = fixtures.createAnyTopic();
  delete topicWithoutTags.tags;

  const result = validator.isValid(topicWithoutTags);

  assert.equal(result.isValid, false);
  assert.end();
});
test('should return false when topic has no name', (assert) => {
  const topicWithoutOwnerId = fixtures.createAnyTopic();
  const expectedErrors = [
    'should have required property \'ownerId\''
  ];
  delete topicWithoutOwnerId.ownerId;

  const result = validator.isValid(topicWithoutOwnerId);

  assert.equal(result.isValid, false);
  assert.deepEqual(result.errors, expectedErrors);
  assert.end();
});

test('should return false when topic has extra properties', (assert) => {
  const topicWithExtraProperties = fixtures.createAnyTopic();
  topicWithExtraProperties.extraProperty = 'extraProperty';

  const result = validator.isValid(topicWithExtraProperties);

  assert.equal(result.isValid, false);
  assert.end();
});

