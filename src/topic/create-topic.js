const database = require('../database');
const validator = require('./validator');

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
    body: [].concat(errors)
  };
  return badRequestResponse;
}

function createTopic(topic, done) {
  const validationResult = validator.isValid(topic);
  if(!validationResult.isValid) {
    done(responseFactory.badRequest(validationResult.errors));
    return;
  }
  database.createTopic(topic, handleTopicCreation);

  function handleTopicCreation(error, createdTopic) {
    if(error) done(responseFactory.genericError(error));
    else done(null, responseFactory.success(createdTopic));
  }
}


