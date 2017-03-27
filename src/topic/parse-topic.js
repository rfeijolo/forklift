'use strict';

module.exports = function (event) {
  const parsedBody = JSON.parse(event.body);
  return {
    name: parsedBody.name,
    tags: parsedBody.tags
  };
};

