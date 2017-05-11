module.exports = {
  error: error
};

function error(errorObject) {
  console.error(JSON.stringify(errorObject));
}
