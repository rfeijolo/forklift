const test = require('tape');
const responseFactory = require('../../response-factory');

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
  const expectedBody = '{"message":"An unexpected error has ocurred."}';
  const internalServerErrorStatusCode = 500;

  const response = responseFactory.genericError();

  assert.equal(response.statusCode, internalServerErrorStatusCode);
  assert.equal(response.body, expectedBody);
  assert.end();
});

test('should create bad request response', (assert) => {
  const errorMessage = 'Any error message';
  const expectedBody = `{"message":"An error ocurred while processing your request\\n${errorMessage}"}`;
  const badRequestStatusCode = 400;

  const response = responseFactory.badRequest([errorMessage]);

  assert.equal(response.statusCode, badRequestStatusCode);
  assert.deepEqual(response.body, expectedBody);
  assert.end();
});

test('should create forbidden response', (assert) => {
  const expectedBody = '{"message":"You are not authorized to perform this action."}';
  const forbiddenStatusCode = 403;

  const response = responseFactory.forbidden();

  assert.equal(response.statusCode, forbiddenStatusCode);
  assert.equal(response.body, expectedBody);
  assert.end();
});
