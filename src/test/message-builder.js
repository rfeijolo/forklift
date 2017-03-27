module.exports = MessageBuilder;

function MessageBuilder() {
  const anyMessage = {
    title: 'anyTitle',
    text: 'There is a new version available. Check it out on the website.'
  };

  return {
    build: () => anyMessage,
    withTopicId: function(topicId) {
      anyMessage.topicId = topicId;
      return this;
    }
  };
}

