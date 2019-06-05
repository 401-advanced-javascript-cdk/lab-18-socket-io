'use strict';

const events = require('./events.js');
const constants = require('./constants.js');

const socketIOClient = require('socket.io-client');
const socket = socketIOClient.connect(constants.SERVER_ADDRESS);

const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const file = process.argv.slice(2).shift();

const transformText = (data) => {
  return data.toString().toUpperCase();
}

readFileAsync(file)
  .then(rawData => transformText(rawData))
  .then(text => writeFileAsync(file, Buffer.from(text)))
  .then(() => {
    socket.emit(events.SAVE_EVENT, `new text saved to ${file}`);
    socket.disconnect();
  })
  .catch(error => {
    socket.emit(events.ERROR_EVENT,
      {
        text: `error saving new text to file ${file}`,
        errorMessage: error
      }
    );
    socket.disconnect();
});