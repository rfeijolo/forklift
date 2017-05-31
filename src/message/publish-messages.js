'use strict';
const messageBroker = require('../message-broker');
const database = require('../database');

module.exports = publishMessages;

function publishMessages(messages, done) {
  const publicationPromises = messages.map(createPublicationPromise);
  Promise.all(publicationPromises).then(() => done(null));
}

function createPublicationPromise(message) {
  return new Promise((resolve) => {
    database.getTopic(message.topicId, (error, topic) => {
      messageBroker.publish(topic.notificationStoreId, message, resolve);
    });
  });
}
