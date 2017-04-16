const database = require('../database');
const responseFactory = require('../responseFactory');

module.exports = createMessage;

function createMessage(message, done) {
  database.createMessage(message, handleMessageCreation);

  function handleMessageCreation(error, createdMessage) {
    if(error) done(null, responseFactory.genericError(error));
    else done(null, responseFactory.success(createdMessage));
  }
}

