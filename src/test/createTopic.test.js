const test = require('tape');
const createTopic = require('../createTopic');
const databaseMock = {
  createTopic: noop
};

function noop(item, done) {
  done(null, item);
}
test('should return OK (status code 200)', (assert) => {
  const anyTopic = {
    name: 'anyName',
    tags: [
      'Pokémon', 'Chavo del ocho'
    ]
  };
  createTopic(anyTopic, databaseMock, isResponseOk);

  function isResponseOk (error, response) {
    const okStatusCode = 200;
    const serializedBody = JSON.stringify(anyTopic);

    assert.equal(null, error);
    assert.equal(okStatusCode, response.statusCode);
    assert.equal(serializedBody, response.body);
    assert.end();
  }
});
