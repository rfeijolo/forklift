const test = require('tape');
const parseMessage = require('../../../message/parse-message');

test('should parse an apigateway event', (assert) => {

  const event = {
    body: '{"title":"Pokémon","text":"A wild test appeared!"}'
  };
  const expected = {
    title: 'Pokémon',
    text: 'A wild test appeared!'
  };
  const result = parseMessage(event);
  assert.deepEqual(result, expected);
  assert.end();
});

test('should filter over posted properties', (assert) => {

  const event = {
    body: '{"title":"Pokémon","text":"A wild test appeared!","overpost":true}'
  };
  const expected = {
    title: 'Pokémon',
    text: 'A wild test appeared!'
  };
  const result = parseMessage(event);
  assert.deepEqual(result, expected);
  assert.end();
});
