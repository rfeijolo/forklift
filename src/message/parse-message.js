'use strict';

module.exports = function (event) {
  const parsedBody = JSON.parse(event.body);
  return {
    title: parsedBody.title,
    text: parsedBody.text,
    topicId: event.pathParameters.topicId,
    ownerId: event.requestContext.authorizer.claims.sub
  };
};

