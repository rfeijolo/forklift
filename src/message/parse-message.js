'use strict';

module.exports = function (event) {
  const parsedMessage = JSON.parse(event.body);
  return {
    title: parsedMessage.title,
    text: parsedMessage.text
  };
};

