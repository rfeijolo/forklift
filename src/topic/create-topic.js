const database = require('../database');
module.exports = createTopic;

const responseFactory = {
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
    body: JSON.stringify(errors.join('\n'))
  };
  return badRequestResponse;
}

function createTopic(topic, done) {
  database.createTopic(topic, handleTopicCreation);

  function handleTopicCreation(error, createdTopic) {
    if(error) done(responseFactory.genericError(error));
    else done(null, responseFactory.success(createdTopic));
  }
}


