const topicSchema = require('./schema');
const validator = require('../validator');

module.exports = {
  isValid: isValid
};

function isValid(topic, done) {
  validator.isValid(topicSchema, topic, done);
}

