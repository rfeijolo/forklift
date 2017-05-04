const database = require('../database');
const responseFactory = require('../response-factory');
const validator = require('./validator');

module.exports = createMessage;

function createMessage(message, done) {
  database.getTopic(message.topicId, handleTopicQuery);

  function handleTopicQuery(error, topic) {
    if (error) {
      done(null, responseFactory.genericError(error));
      return;
    }

    const isAuthorized = validator.isAuthorized(topic, message);
    if(!isAuthorized) {
      done(null, responseFactory.forbidden());
      return;
    }

    const validationResult = validator.isValid(message);
    if(!validationResult.isValid) {
      done(null, responseFactory.badRequest(validationResult.errors));
      return;
    }

    database.createMessage(message, handleMessageCreation);
  }
  function handleMessageCreation(error, createdMessage) {
    if(error) done(null, responseFactory.genericError(error));
    else done(null, responseFactory.success(createdMessage));
  }
}

