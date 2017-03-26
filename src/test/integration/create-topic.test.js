const test = require('tape');
const request = require('supertest');
const applicationUrl = require('../settings').applicationUrl;
const fixtures = require('../fixtures');

test('should return 200 ok when topic is valid', (assert) => {
  const validTopic = fixtures.createAnyTopic();
  request(applicationUrl)
    .post('/topics')
    .send(validTopic)
    .expect(200)
    .end((error, response) => {
      assert.equal(error, null);
      assert.equal(response.body.name, validTopic.name);
      assert.deepEqual(response.body.tags, validTopic.tags);
      assert.end();
    });
});
