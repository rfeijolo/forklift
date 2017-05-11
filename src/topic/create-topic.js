const database = require('../database');
const validator = require('./validator');
const responseFactory = require('../response-factory');
const notificationStore = require('../notification-store');

module.exports = createTopic;

function createTopic(topic, done) {
  validator.isValid(topic, handleValidation);

  function handleValidation(error, validatedTopic) {
    if(error) done(null, responseFactory.badRequest(error));
    else notificationStore.createTopic(validatedTopic, saveTopicInDatabase);
  }

  function saveTopicInDatabase(error, notificationStoreId) {
    if(error) done(null, responseFactory.genericError(error));
    else database.createTopic(
      Object.assign({}, topic, { notificationStoreId: notificationStoreId }),
      handleTopicCreation
    );
  }

  function handleTopicCreation(error, createdTopic) {
    if(error) done(null, responseFactory.genericError(error));
    else done(null, responseFactory.success(createdTopic));
  }
}

