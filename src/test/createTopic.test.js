const test = require('tape');
const createTopic = require('../createTopic');
test('A passing test', (assert) => {
  createTopic(null, null, isResponseOk);

  function isResponseOk (error, response) {
    const okStatusCode = 200;
    const serializedBody = '{"message":"Go Serverless v1.0! Your function executed successfully!"}';

    assert.equal(null, error);
    assert.equal(okStatusCode, response.statusCode);
    assert.equal(serializedBody, response.body);
    assert.end();
  }
});
