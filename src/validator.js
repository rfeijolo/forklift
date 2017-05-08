const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = {
  isValid: isValid
};

function isValid(schema, item, done) {
  const isValid = ajv.validate(schema, item);
  if (!isValid) done(ajv.errors.map((error) => error.message));
  else done(null, item);
}
