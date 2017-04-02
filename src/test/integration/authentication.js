const AWS = require('aws-sdk');
const settings = require('../settings');
const cognito = new AWS.CognitoIdentityServiceProvider({region: 'us-east-1'});

module.exports = {
  signIn: signIn
};

function signIn() {
  return new Promise((resolve, reject) => {
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: settings.userPoolClientId,
      UserPoolId: settings.userPoolId,
      AuthParameters: {
        USERNAME: settings.dummyUsername,
        PASSWORD: settings.dummyUserPassword
      }
    };
    cognito.adminInitiateAuth(params, (err, result) => {
      if(err) {
        reject(err);
        return;
      }
      resolve({
        idToken: result.AuthenticationResult.IdToken
      });
    });
  });
}

