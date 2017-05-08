const messageSchema = require('./schema');
const validator = require('../validator');

module.exports = {
  isValid: isValid,
  isAuthorized: isAuthorized
};

function isValid(message, done) {
  validator.isValid(messageSchema, message, done);
}

function isAuthorized(topic, message, done) {
  if (hasSameOwner(message, topic)) done(new Error('Unauthorized'));
  else done(null, message);
}

function hasSameOwner(message, topic) {
  return message.ownerId !== topic.ownerId;
}

