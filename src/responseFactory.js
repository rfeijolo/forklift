const NEWLINE = '\n';

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
  const errorMessage = 'An unexpected error has ocurred.';
  const response = {
    statusCode: 500,
    body: JSON.stringify({ message: errorMessage })
  };
  return response;
}

function badRequest(errors) {
  const badRequestMessage = 'An error ocurred while processing your request';
  const errorMessage = [badRequestMessage].concat(errors).join(NEWLINE);
  const response = {
    statusCode: 400,
    body: JSON.stringify({ message: errorMessage })
  };
  return response;
}

