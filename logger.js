'use strict';

const events = require('./events.js');
const constants = require('./constants.js');

const socketIOClient = require('socket.io-client');
const socket = socketIOClient.connect(`${constants.SERVER_ADDRESS}/logger`);

socket.on(events.SAVE_EVENT, payload => {
  console.log(payload)
  const message = {
    time: new Date(),
    message: payload,
  }
  console.log(message);
});

socket.on(events.ERROR_EVENT, payload => {
  const message = {
    time: new Date(),
    message: payload.text,
    errorMessage: payload.errorMessage,
  }
  console.log(message);
});