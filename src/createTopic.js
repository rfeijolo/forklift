module.exports = function(topic, database, done) {

  database.createTopic(topic, handleTopicCreation);

  function handleTopicCreation(error, createdTopic) {
    if(error) done(error);
    else done(null, createSuccessResponse(createdTopic));
  }

  function createSuccessResponse(item) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(item),
    };
    return response;
  }
};
