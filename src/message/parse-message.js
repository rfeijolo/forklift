'use strict';

module.exports = (event) => {
  const parsedBody = JSON.parse(event.body);
  return {
    title: parsedBody.title,
    text: parsedBody.text,
    topicId: event.pathParameters.topicId,
    ownerId: event.requestContext.authorizer.claims.sub
  };
};

