const test = require('tape');
const request = require('supertest');
const applicationUrl = require('../settings').applicationUrl;
const fixtures = require('../fixtures');

test('should return 200 ok when message is valid', (assert) => {
  const validMessage = fixtures.createAnyTopic();
  request(applicationUrl)
    .post('/topics/1/messages')
    .send(validMessage)
    .expect(200)
    .end((error, response) => {
      assert.equal(error, null);
      assert.equal(response.body.title, validMessage.title);
      assert.equal(response.body.text, validMessage.text);
      assert.end();
    });
});

