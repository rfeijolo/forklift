'use strict';
const parser = require('./parse-message');
const createMessage = require('./create-message');

module.exports.createMessage = function (event, context, callback) {
  createMessage(parser(event), callback);
};

