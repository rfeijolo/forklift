const test = require('tape');

test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

test('Another passing test', (assert) => {
  const expected = 'any string';
  const actual = 'any string';

  assert.equal(actual, expected);
  assert.end();
});
