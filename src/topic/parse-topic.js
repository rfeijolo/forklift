'use strict';

module.exports = function (event) {
  const parsedTopic = JSON.parse(event.body);
  return {
    name: parsedTopic.name,
    tags: parsedTopic.tags
  };
};
