const database = require('../database');
const responseFactory = require('../response-factory');
const validator = require('./validator');

module.exports = createMessage;

function createMessage(message, done) {
  validator.isValid(message, handleValidation);

  function handleValidation(error, validMessage) {
    if (error) done(null, responseFactory.badRequest(error));
    else database.getTopic(validMessage.topicId, handleTopicQuery);
  }

  function handleTopicQuery(error, topic) {
    if (error) done(null, responseFactory.genericError(error));
    else validator.isAuthorized(topic, message, saveInDatabase);
  }

  function saveInDatabase(error, message) {
    if(error) done(null, responseFactory.forbidden());
    else database.createMessage(message, handleMessageCreation);
  }

  function handleMessageCreation(error, createdMessage) {
    if(error) done(null, responseFactory.genericError(error));
    else done(null, responseFactory.success(createdMessage));
  }
}

