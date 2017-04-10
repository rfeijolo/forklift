const MessageFixture = require('../message-builder');
const APPLICATION_URL = require('../settings').applicationUrl;
const fixtures = require('../fixtures');
const request = require('supertest');
const test = require('tape');
const authentication = require('./authentication');

test('should test the publication workflow', (assert) => {
  return authentication.signIn()
    .then(createTopicAndMessage(assert))
    .then(assert.end);
});

function createTopicAndMessage(assert) {
  return (credentials) => {
    const topic = fixtures.createAnyTopic();
    const messageBuilder = new MessageFixture();

    return createTopic(topic, credentials)
      .then(validateTopicCreation(topic, assert))
      .then(createMessage(messageBuilder, credentials))
      .then(validateMessageCreation(messageBuilder, assert));
  };
}

function createAuthenticatedPostRequest(path, body, credentials) {
  return request(APPLICATION_URL)
    .post(path)
    .set('Authorization', credentials.idToken)
    .send(body);
}

function createTopic(topic, credentials) {
  return createAuthenticatedPostRequest('/topics', topic, credentials);
}

function validateTopicCreation(topic, assert) {
  return (response) => {
    console.log(response);
    const createdTopic = response.body;
    const okStatusCode = 200;
    assert.equal(response.status, okStatusCode);
    assert.equal(createdTopic.name, topic.name);
    assert.deepEqual(createdTopic.tags, topic.tags);
    return createdTopic;
  };
}

function createMessage(messageBuilder, credentials) {
  return (topic) => {
    return createAuthenticatedPostRequest(
      `/topics/${topic.id}/messages`,
       messageBuilder.build(),
      credentials
    ).expect((response) => {
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
    assert.equal(response.status, okStatusCode);
    assert.equal(createdMessage.title, expectedMessage.title);
    assert.equal(createdMessage.text, expectedMessage.text);
    assert.equal(createdMessage.topicId, expectedMessage.topicId);
  };
}

