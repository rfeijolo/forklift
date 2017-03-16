module.exports = createTopic;

function createTopic(topic, database, done) {

  database.createTopic(topic, handleTopicCreation);

  function handleTopicCreation(error, createdTopic) {
    if(error) done(createGenericErrorResponse(error));
    else done(null, createSuccessResponse(createdTopic));
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
