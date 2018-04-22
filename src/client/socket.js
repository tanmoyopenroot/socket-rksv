import socketIOClient from 'socket.io-client';
import config from './../config/app';

const socket = socketIOClient(`${config.endpoint}/watch`);

function connect(connectHandler) {
  socket.on('connect', connectHandler);
}

function subscribe(state) {
  socket.emit('sub', state);
}

function unsubscribe(state) {
  socket.emit('unsub', state);
}

function receiveData(onDataReceive) {
  socket.on('data', onDataReceive);
}

export {
  connect,
  subscribe,
  unsubscribe,
  receiveData
};
