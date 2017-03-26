module.exports = createMessage;

function createMessage(message, database, done) {
  database.createMessage(message, handleMessageCreation);

  function handleMessageCreation(error, createdMessage) {
    if(error) done(createGenericErrorResponse(error));
    else done(null, createSuccessResponse(createdMessage));
  }

  function createSuccessResponse(item) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(item),
    };
    return response;
  }

  function createGenericErrorResponse() {
    const errorResponse = {
      statusCode: 500,
      message: 'An unexpected error has ocurred.'
    };
    return JSON.stringify(errorResponse);
  }
}

