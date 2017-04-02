const test = require('tape');
const responseFactory = require('../../responseFactory');

test('should create sucess response', (assert) => {
  const anyItem = {};

  const response = responseFactory.success(anyItem);

  const okStatusCode = 200;
  const serializedBody = JSON.stringify(anyItem);
  assert.equal(response.statusCode, okStatusCode);
  assert.equal(response.body, serializedBody);
  assert.end();
});

test('should create generic error response', (assert) => {
  const expectedErrorMessage = 'An unexpected error has ocurred.';
  const internalServerErrorStatusCode = 500;

  const response = responseFactory.genericError();

  const error = JSON.parse(response);
  assert.equal(error.statusCode, internalServerErrorStatusCode);
  assert.equal(error.message, expectedErrorMessage);
  assert.end();
});

test('should create bad request response', (assert) => {
  const expectedErrors = ['Any error message'];
  const badRequestStatusCode = 400;

  const response = responseFactory.badRequest(expectedErrors);

  assert.equal(response.statusCode, badRequestStatusCode);
  assert.deepEqual(response.body, expectedErrors);
  assert.end();
});
