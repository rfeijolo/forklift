const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = isValid;

function isValid(schema, item) {
  return {
    isValid: ajv.validate(schema, item),
    errors: ajv.errors ? ajv.errors.map((error) => error.message) : undefined
  };
}
