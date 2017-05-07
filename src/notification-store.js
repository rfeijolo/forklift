'use strict';
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const sns = new AWS.SNS();

module.exports = {
  createTopic: createTopic
};

function createTopic(topic, done) {
  const params = {
    Name: `${topic.name}_${topic.ownerId}`
  };

  sns.createTopic(params, (error, data) => {
    if(error) done(error);
    else done(null, data.TopicArn);
  });
}

