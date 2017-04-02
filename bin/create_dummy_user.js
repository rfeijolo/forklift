#!/usr/bin/env node

const AWS = require('aws-sdk');
const settings = require('../src/test/settings');

const cognito = new AWS.CognitoIdentityServiceProvider({region: 'us-east-1'});
const params = {
  ClientId: settings.userPoolClientId,
  Username: settings.dummyUsername,
  Password: settings.dummyUserPassword,
  UserAttributes: [
    {
      Name: 'email',
      Value: settings.dummyUserEmail
    }
  ]
};

cognito.signUp(params, (err) => {
  if(err) throw err;
  console.log('Dummy user created.');

  const confirmSignUpParams = {
    UserPoolId: settings.userPoolId,
    Username: settings.dummyUsername
  };
  cognito.adminConfirmSignUp(confirmSignUpParams, (err) => {
    if(err) throw err;
    console.log('Dummy user activated.');
  });
});

