const test = require('tape');
const parseMessage = require('../../../message/parse-message');

test('should parse an apigateway event', (assert) => {
  const event = createMessageEvent();
  const expected = {
    title: 'Pokémon',
    text: 'A wild test appeared!',
    topicId: 'anyTopicId'
  };

  const result = parseMessage(event);

  assert.deepEqual(result, expected);
  assert.end();
});

test('should filter over posted properties', (assert) => {
  const event = createMessageEvent();
  const expected = {
    title: 'Pokémon',
    text: 'A wild test appeared!',
    topicId: 'anyTopicId'
  };

  const result = parseMessage(event);

  assert.deepEqual(result, expected);
  assert.end();
});

function createMessageEvent() {
  return {
    body: '{"title":"Pokémon","text":"A wild test appeared!"}',
    pathParameters: {
      topicId: 'anyTopicId'
    }
  };
}

