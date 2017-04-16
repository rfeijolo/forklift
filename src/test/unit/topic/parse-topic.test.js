const test = require('tape');
const parseTopic = require('../../../topic/parse-topic');

test('should parse an apigateway event', (assert) => {
  const anyOwnerId = 'anyOwnerId';
  const event = {
    body: '{"name":"Pokémon","tags":["Nintendo","3DS"]}',
    requestContext: {
      authorizer: {
        claims: {
          sub: anyOwnerId
        }
      }
    }
  };
  const expected = {
    name: 'Pokémon',
    tags: ['Nintendo', '3DS'],
    ownerId: anyOwnerId
  };

  const result = parseTopic(event);

  assert.deepEqual(result, expected);
  assert.end();
});

test('should filter over posted properties', (assert) => {
  const anyOwnerId = 'anyOwnerId';
  const event = {
    body: '{"name":"Pokémon","tags":["Nintendo","3DS"],"overpost":true}',
    requestContext: {
      authorizer: {
        claims: {
          sub: anyOwnerId
        }
      }
    }
  };
  const expected = {
    name: 'Pokémon',
    tags: ['Nintendo', '3DS'],
    ownerId: anyOwnerId
  };

  const result = parseTopic(event);

  assert.deepEqual(result, expected);
  assert.end();
});

