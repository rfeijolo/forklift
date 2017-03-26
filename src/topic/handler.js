'use strict';
const parser = require('./parse-topic');
const database = require('../database');
const createTopic = require('./create-topic');

module.exports.createTopic = function (event, context, callback) {
  createTopic(parser(event), database, callback);
};
