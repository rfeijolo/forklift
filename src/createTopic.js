module.exports = function(topic, database, done) {

  database.createTopic(topic, handleTopicCreation);

  function handleTopicCreation(error, createdTopic) {
    if(error) done(createGenericErrorResponse(error));
    else done(null, createSuccessResponse(createdTopic));
  }

  function createSuccessResponse(item) {
    const response = {
      httpStatus: 200,
      body: JSON.stringify(item),
    };
    return response;
  }

  function createGenericErrorResponse() {
    const error = {
      errorType: 'InternalServerError',
      httpStatus: 500,
      message: JSON.stringify({})
    };
    return JSON.stringify(error);
  }
};
