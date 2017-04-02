const database = require('../database');
const validator = require('./validator');
const responseFactory = require('../responseFactory');

module.exports = createTopic;

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

