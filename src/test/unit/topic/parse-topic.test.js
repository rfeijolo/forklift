const test = require('tape');
const parseTopic = require('../../../topic/parse-topic');

test('should parse an apigateway event', (assert) => {
  const event = {
    body: '{"name":"Pokémon","tags":["Nintendo","3DS"]}'
  };
  const expected = {
    name: 'Pokémon',
    tags: ['Nintendo', '3DS']
  };

  const result = parseTopic(event);

  assert.deepEqual(result, expected);
  assert.end();
});

test('should filter over posted properties', (assert) => {
  const event = {
    body: '{"name":"Pokémon","tags":["Nintendo","3DS"],"overpost":true}'
  };
  const expected = {
    name: 'Pokémon',
    tags: ['Nintendo', '3DS']
  };

  const result = parseTopic(event);

  assert.deepEqual(result, expected);
  assert.end();
});

