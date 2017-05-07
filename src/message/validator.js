const messageSchema = require('./schema');
const validator = require('../validator');

module.exports = {
  isValid: isValid,
  isAuthorized: isAuthorized
};

function isValid(message, done) {
  const result = validator(messageSchema, message);
  if (!result.isValid) done(result.errors);
  else done(null, message);
}

function isAuthorized(topic, message, done) {
  if (message.ownerId !== topic.ownerId) done(new Error('Unauthorized'));
  else done(null, message);
}

