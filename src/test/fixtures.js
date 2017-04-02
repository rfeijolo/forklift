module.exports = {
  createAnyTopic: createAnyTopic
};

function createAnyTopic() {
  return {
    name: 'anyName',
    tags: [
      'Pokémon', 'Chavo del ocho'
    ],
    ownerId: 'anyOwner'
  };
}

