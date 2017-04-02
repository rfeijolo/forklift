const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = {
  isValid: isValid
};

function isValid(topic) {
  const schema = {
    required: ['name', 'tags', 'ownerId'],
    additionalProperties: false,
    properties: {
      name: { type: 'string' },
      tags: { type: 'array' },
      ownerId: { type: 'string' }
    }
  };
  return {
    isValid: ajv.validate(schema, topic),
    errors: ajv.errors
  };
}

