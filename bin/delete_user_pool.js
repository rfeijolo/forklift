#!/usr/bin/env node

const settings = require('../src/settings');
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });
const params = {
  'UserPoolId': settings.userPoolId
};

cognito.deleteUserPool(params, function (err) {
  if (err) {
    throw err;
  }
});
