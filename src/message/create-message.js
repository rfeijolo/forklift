const database = require('../database');
const responseFactory = require('../response-factory');

module.exports = createMessage;

function createMessage(message, done) {
  //validateMessage
  //hasSameOwner
  database.createMessage(message, handleMessageCreation);

  function handleMessageCreation(error, createdMessage) {
    if(error) done(null, responseFactory.genericError(error));
    else done(null, responseFactory.success(createdMessage));
  }
}

