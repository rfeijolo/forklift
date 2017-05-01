const messageSchema = require('./schema');
const validator = require('../validator');

module.exports = {
  isValid: isValid,
  isAuthorized: isAuthorized
};

function isValid(message) {
  return validator(messageSchema, message);
}

function isAuthorized(topic, message) {
  return typeof message.ownerId !== 'undefined' &&
    message.ownerId === topic.ownerId;
}

