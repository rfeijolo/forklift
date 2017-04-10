'use strict';

module.exports = function (event) {
  const parsedBody = JSON.parse(event.body);
  return {
    ownerId: event.requestContext.authorizer.claims.sub,
    name: parsedBody.name,
    tags: parsedBody.tags
  };
};

