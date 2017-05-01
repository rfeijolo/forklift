const messageSchema = require('./schema');
const validator = require('../validator');

module.exports = {
  isValid: isValid
};

function isValid(message) {
  return validator(messageSchema, message);
}

