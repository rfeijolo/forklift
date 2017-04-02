module.exports = {
  success: success,
  genericError: genericError,
  badRequest: badRequest
};

function success(item) {
  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };
  return response;
}

function genericError() {
  const errorResponse = {
    statusCode: 500,
    message: 'An unexpected error has ocurred.'
  };
  return JSON.stringify(errorResponse);
}

function badRequest(errors) {
  const badRequestResponse = {
    statusCode: 400,
    body: [].concat(errors)
  };
  return badRequestResponse;
}

