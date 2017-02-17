module.exports = function(topic, database, done) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!'
    }),
  };


  database.createTopic(topic, (error) => {
    if(error) {
      done(error);
      return;
    }

    done(null, response);
  });
};
