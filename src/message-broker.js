'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const sns = new AWS.SNS();
module.exports = {
  publish: publish
};

function publish(notificationStoreId, message, done) {
  const params = {
    Message: message.text,
    Subject: message.title,
    TopicArn: notificationStoreId
  };
  sns.publish(params, function(error, data) {
    if (error) {
      console.log(error);
      done(error);
      return;
    }
    else {
      console.log(data);
      done(null, data);
    }
  });
}

