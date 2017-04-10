const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('./schema');

module.exports = {
  isValid: isValid
};

function isValid(topic) {
  return {
    isValid: ajv.validate(schema, topic),
    errors: ajv.errors ? ajv.errors.map((error) => error.message) : undefined
  };
}

