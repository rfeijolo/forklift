'use strict';

module.exports = (event) => {
  const messages = event.Records.map(extractImage).map(createMessage);
  return messages;
};

function extractImage(record) {
  return record.dynamodb.NewImage;
}

function createMessage(image) {
  const message = {
    topicId: image.topicId.S,
    text: image.text.S,
    title: image.title.S
  };
  return message;
}
