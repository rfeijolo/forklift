#!/usr/bin/env node

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });
const iam = new AWS.IAM();

const params = {
  'AliasAttributes': ['email'],
  'PoolName': 'forklift',
};

cognito.createUserPool(params, function (err, poolData) {
  if (err) {
    throw err;
  }

  iam.getUser({}, function (err, iamData) {
    if (err) {
      throw err;
    }

    var id = iamData.User.Arn.split(':')[4];
    console.log('User Pool ARN is arn:aws:cognito-idp:us-east-1:' + id + ':userpool/' + poolData.UserPool.Id);
    console.log(`export AWS_USER_POOL_ID='${poolData.UserPool.Id}'`);
  });
});
