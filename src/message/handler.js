'use strict';

const parser = require('./parse-message');
const createMessage = require('./create-message');

const parseStreamEvent = require('./parse-stream-event');
const publishMessages = require('./publish-messages');

module.exports = {
  create: create,
  publish: publish
};

function create (event, context, callback) {
  createMessage(parser(event), callback);
}

function publish(event, context, callback) {
  publishMessages(parseStreamEvent(event), callback);
}

