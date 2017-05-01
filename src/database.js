'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const TOPICS_TABLE = 'topics';
const MESSAGES_TABLE = 'messages';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports = {
  createTopic: createItem(TOPICS_TABLE),
  createMessage: createItem(MESSAGES_TABLE),
  getTopic: getTopic
};

function createItem(table) {
  return function(item, done) {
    const timestamp = new Date().getTime();
    const databaseItem = Object.assign({}, item, {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp
    });
    const params = {
      TableName: table,
      Item: databaseItem
    };

    dynamoDb.put(params, (error) => {
      if(error) done(error);
      else done(null, databaseItem);
    });
  };
}

function getTopic(topicId, done) {
  const params = {
    TableName: TOPICS_TABLE,
    Key: {
      'id': topicId
    }
  };

  dynamoDb.get(params, (error, data) => {
    if(error) done(error);
    else done(null, data);
  });
}

