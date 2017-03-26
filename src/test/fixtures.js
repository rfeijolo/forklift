module.exports = {
  createAnyTopic: createAnyTopic,
  createAnyMessage: createAnyMessage
};

function createAnyTopic() {
  return {
    name: 'anyName',
    tags: [
      'Pokémon', 'Chavo del ocho'
    ]
  };
}

function createAnyMessage() {
  return {
    title: 'anyTitle',
    text: 'There is a new version available. Check it out on the website.',
    topic: 'anyName'
  };
}

