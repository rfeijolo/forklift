const database = require('../database');
const validator = require('./validator');
const responseFactory = require('../response-factory');
const notificationStore = require('../notification-store');

module.exports = createTopic;

function createTopic(topic, done) {
  const validationResult = validator.isValid(topic);
  if(!validationResult.isValid) {
    done(null, responseFactory.badRequest(validationResult.errors));
    return;
  }
  notificationStore.createTopic(topic, saveTopicInDatabase);

  function saveTopicInDatabase(error, notificationStoreId) {
    if(error) done(null, responseFactory.genericError(error));
    else database.createTopic(
      Object.assign({}, topic, { notificationStoreId: notificationStoreId }),
      handleTopicCreation
    );
  }

  function handleTopicCreation(error, createdTopic) {
    if(error) done(null, responseFactory.genericError());
    else done(null, responseFactory.success(createdTopic));
  }
}

