module.exports = {
  noop: noop,
  throwError: throwError
};

function noop (parameter, done) {
  done(null, parameter);
}

function throwError (parameter, done) {
  done(new Error('Something bad happened'));
}

