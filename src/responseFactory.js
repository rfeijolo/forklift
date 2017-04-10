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
  const errorMessage = '[500] An unexpected error has ocurred.';
  return new Error(JSON.stringify(errorMessage));
}

function badRequest(errors) {
  const badRequestMessage = '[400] An error ocurred while processing your request';
  const errorMessage = [badRequestMessage].concat(errors).join(NEWLINE);
  return new Error(JSON.stringify(errorMessage));
}

