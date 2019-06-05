'use strict';

const events = require('./events.js');

const socketIOServer = require('socket.io')(3030);
const logger = socketIOServer.of('/logger');

socketIOServer.on('connection', socket => {
  console.log(`New socket connected: ${socket.id}`);

  socket.on(events.SAVE_EVENT, payload => {
    logger.emit(events.SAVE_EVENT, payload);
  });

  socket.on(events.ERROR_EVENT, payload => {
    logger.emit(events.ERROR_EVENT, payload);
  });

});

socketIOServer.on('disconnect', socket => {
  console.log(`${socket.id}`);
})