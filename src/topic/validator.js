const topicSchema = require('./schema');
const validator = require('../validator');

module.exports = {
  isValid: isValid
};

function isValid(topic) {
  return validator(topicSchema, topic);
}

