'use strict';

module.exports = function (event) {
  const parsedTopic = JSON.parse(event.body);
  const {name, tags} = parsedTopic;
  return {name, tags};
};
