const MessageFixture = require('../message-builder');
const applicationUrl = require('../settings').applicationUrl;
const fixtures = require('../fixtures');
const request = require('supertest');
const test = require('tape');

test('should test the publication workflow', (assert) => {
  const validTopic = fixtures.createAnyTopic();
  const messageBuilder = new MessageFixture();

  return createTopic(validTopic)
    .then(validateTopicCreation(validTopic, assert))
    .then(createMessage(messageBuilder))
    .then(validateMessageCreation(messageBuilder, assert))
    .then(assert.end);
});

function createTopic(topic) {
  return request(applicationUrl)
    .post('/topics')
    .send(topic);
}

function validateTopicCreation(topic, assert) {
  return (response) => {
    const createdTopic = response.body;
    const okStatusCode = 200;
    assert.equal(okStatusCode, response.status);
    assert.equal(createdTopic.name, topic.name);
    assert.deepEqual(createdTopic.tags, topic.tags);
    return createdTopic;
  };
}

function createMessage(messageBuilder) {
  return (topic) => {
    return request(applicationUrl)
      .post(`/topics/${topic.id}/messages`)
      .send(messageBuilder.build())
      .expect((response) => {
        messageBuilder.withTopicId(topic.id);
        return response;
      });
  };
}

function validateMessageCreation(messageBuilder, assert) {
  return (response) => {
    const createdMessage = response.body;
    const expectedMessage = messageBuilder.build();
    const okStatusCode = 200;
    assert.equal(okStatusCode, response.status);
    assert.equal(createdMessage.title, expectedMessage.title);
    assert.equal(createdMessage.text, expectedMessage.text);
    assert.equal(createdMessage.topicId, expectedMessage.topicId);
  };
}

