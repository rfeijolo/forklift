'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTopic = (topic, done) => {
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

  dynamoDb.put(params, done);
};
