'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports = {
  createTopic: createTopic,
  createMessage: createMessage
};

function createTopic(topic, done) {
  const timestamp = new Date().getTime();
  const item = Object.assign({}, topic, {
    id: uuid.v1(),
    createdAt: timestamp,
    updatedAt: timestamp
  });
  const params = {
    TableName: 'topics',
    Item: item
  };

  dynamoDb.put(params, (error) => {
    if(error) done(error);
    else done(null, item);
  });
}

function createMessage(message, done) {
  const timestamp = new Date().getTime();
  const item = Object.assign({}, message, {
    id: uuid.v1(),
    createdAt: timestamp,
    updatedAt: timestamp
  });
  const params = {
    TableName: 'messages',
    Item: item
  };

  dynamoDb.put(params, (error) => {
    if(error) done(error);
    else done(null, item);
  });
}
