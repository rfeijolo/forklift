const test = require('tape');
const validator = require('../../../topic/validator');
const fixtures = require('../../fixtures');

test('should return true when topic is valid', (assert) => {
  const anyTopic = fixtures.createAnyTopic();

  const result = validator.isValid(anyTopic);

  assert.equal(result, true);
  assert.end();
});

test('should return false when topic has extra properties', (assert) => {
  const topicWithExtraProperties = fixtures.createAnyTopic();
  topicWithExtraProperties.extraProperty = 'extraProperty';

  const result = validator.isValid(topicWithExtraProperties);

  assert.equal(result, false);
  assert.end();
});

