'use strict';
const parser = require('./parse-message');
const database = require('../database');
const createMessage = require('./create-message');

module.exports.createMessage = function (event, context, callback) {
  createMessage(parser(event), database, callback);
};
